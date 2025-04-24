// App.js
import React from 'react';
import {Button, View, StyleSheet, Alert, Text, Pressable} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import firebase from './firebase';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const storage = getStorage();

/* ── 3.  Component with a single “Upload image” button ────────────────── */
export default function App() {
  
  const pickAndUpload = async () => {
    const number = Math.random();
    console.log("upload ", number);

    try {
      // Request permission first
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to grant camera roll permissions to upload images.");
        return;
      }
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      console.log("ImagePicker result:", result);
      
      if (result.canceled) {
        console.log("User cancelled image picker");
        return;
      }
      
      if (result.assets && result.assets.length > 0) {
        const { uri } = result.assets[0];
        
        try {
          /* Turn it into a Blob */
          const blob = await (await fetch(uri)).blob();
          
          /* Make a unique Storage path and begin upload */
          const name = uri.substring(uri.lastIndexOf('/') + 1);
          const path = `uploads/${Date.now()}-${name}`;
          const refStr = ref(storage, path);
          
          await uploadBytesResumable(refStr, blob);
          
          /* Get the HTTPS download URL */
          const url = await getDownloadURL(refStr);
          Alert.alert('Upload Success', `File available at:\n${url}`);
        } catch (e) {
          Alert.alert('Upload failed', e.message);
        }
      }
    } catch (error) {
      console.log("Image picker error:", error);
      Alert.alert('Error', 'Failed to open image picker');
    }
  };

  return (
    <View style={styles.root}>
      <Pressable  onPress={pickAndUpload} >
        <Text>Pick image & upload</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open</Text>
//       <Text>Open up App.js to start working!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
