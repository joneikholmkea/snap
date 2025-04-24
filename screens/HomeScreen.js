// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// --- Firebase Imports ---
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase'; // Adjust path if needed

import SnapItem from '../components/SnapItem'; // Assuming this component exists and works

export default function HomeScreen() {
  const [snaps, setSnaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // --- Firestore Query ---
    // Query the 'snaps' collection
    const q = query(
      collection(db, 'snaps'),
      where('viewed', '==', false), // Only get snaps that haven't been viewed
      orderBy('createdAt', 'desc') // Order by creation time, newest first (ensure 'createdAt' field exists)
    );

    // --- Firestore Listener ---
    // onSnapshot listens for real-time updates
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => { // Success callback
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Get the document ID
          ...doc.data(), // Spread the rest of the document data
        }));
        setSnaps(data); // Update state with the new snaps list
        setLoading(false); // Stop loading indicator
        setError(null); // Clear any previous errors
      },
      (err) => { // Error callback
        console.error("Error fetching snaps: ", err);
        setError(`Failed to load snaps: ${err.message}`); // Set error message
        setLoading(false); // Stop loading indicator
      }
    );

    // --- Cleanup Function ---
    // This function runs when the component unmounts
    // It stops the listener to prevent memory leaks
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  // --- Handle Press ---
  // Navigate to SnapView when an item is pressed
  //TODO: This needs to be edited to the ViewSnapScreen.js logic, as this is just a placeholder for getting it to work.
  const handlePress = (snapId) => {
    // Find the full snap object using the ID
    const snap = snaps.find(s => s.id === snapId);
    if (snap) {
      // Pass the entire snap object as a parameter
      navigation.navigate('SnapView', { snap: snap });
    } else {
      console.warn(`Snap with ID ${snapId} not found in current list.`);
      // Optionally show an error to the user
    }
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (snaps.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No new snaps.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={snaps}
        keyExtractor={(item) => item.id} // Use snap ID as the key
        renderItem={({ item }) => (
          <SnapItem
            id={item.id} // Pass ID to SnapItem
            image={item.image} // Pass image URI
            sender={item.sender} // Pass sender name
            onPress={() => handlePress(item.id)} // Pass ID to handler onPress
            // Make sure SnapItem is expecting 'id' and 'onPress' uses it correctly
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: 'red', textAlign: 'center' },
});