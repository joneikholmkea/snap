// screens/SnapView.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes

// --- Firebase Imports ---
// Make sure you have firebase configured and db exported from '../firebase'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed

export default function SnapView({ route, navigation }) {
  // Check if snap exists and has an id before destructuring
  const snap = route.params?.snap;
  const snapId = snap?.id;

  const [countdown, setCountdown] = useState(5);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    // Ensure we have a snap and snapId to work with
    if (!snap || !snapId) {
      console.warn('Snap data or ID missing in SnapView route params');
      setError('Could not load snap data.');
      // Optionally navigate back immediately if data is missing
      // navigation.goBack();
      return; // Stop execution of the effect
    }

    // Hide header for full-screen view
    navigation.setOptions({ headerShown: false });

    // Countdown timer tick
    const interval = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0)); // Prevent going below 0
    }, 1000);

    // Action after 5 seconds
    const timeout = setTimeout(async () => {
      clearInterval(interval); // Stop the countdown display
      setMarking(true); // Show loading indicator
      setError(null); // Clear previous errors

      try {
        // Get a reference to the specific snap document in Firestore
        const snapRef = doc(db, 'snaps', snapId);
        // Update the 'viewed' field to true
        await updateDoc(snapRef, { viewed: true });
        // Successfully marked, navigate back
        navigation.goBack();
      } catch (err) {
        console.error('Error marking snap as viewed:', err);
        setError('Failed to mark snap as viewed. Please try again.');
        // Keep the marking indicator or hide it, depending on desired UX
        // setMarking(false);
        // Optionally add a delay before navigating back on error
        // setTimeout(() => navigation.goBack(), 2000);
      } finally {
        // This block executes whether try succeeded or failed
        // We navigate back in 'try' on success, so only need to handle cleanup/state reset here if needed
        // If not navigating back on error, you might want: setMarking(false);
      }
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup function: runs when the component unmounts or dependencies change
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      // Optional: Reset header if needed when leaving the screen
      // navigation.setOptions({ headerShown: true });
    };
  }, [navigation, snap, snapId]); // Add snap and snapId as dependencies

  // Display error message if something went wrong
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        {/* Optionally add a button to go back manually */}
        {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
      </View>
    );
  }

  // Display loading or missing data state before snap is ready
  if (!snap) {
     return (
       <View style={styles.center}>
         <ActivityIndicator size="large" color="#fff" />
         <Text style={styles.loadingText}>Loading Snap...</Text>
       </View>
     );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: snap.image }}
        style={styles.fullImage}
        resizeMode="contain" // Ensure the whole image is visible
      />

      {/* Countdown Overlay */}
      {countdown > 0 && !marking && (
        <View style={styles.overlay}>
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      )}

      {/* Marking as Viewed Overlay */}
      {marking && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.markingText}>Marking as viewed…</Text>
        </View>
      )}
    </View>
  );
}

// --- PropTypes for props validation ---
SnapView.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      snap: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        // Add other expected snap properties here if needed
      }).isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired, // React Navigation prop
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullImage: {
    flex: 1, // Use flex to fill container
    width: '100%', // Ensure width is full
    // height: '100%', // Let flex handle height based on resizeMode
  },
  overlay: {
    // Position overlay absolutely over the image
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdown: {
    fontSize: 64, // Larger countdown text
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Text shadow for readability
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  markingText: {
    marginTop: 15,
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  center: { // Style for loading/error states
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Match background
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});