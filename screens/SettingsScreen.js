import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_profile";

const defaultUser = {
  firstName: "John",
  lastName: "Doe",
  password: "password123",
};

export default function SettingsScreen() {
  const [user, setUser] = useState(defaultUser);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState(user.password);

  // Load user data from AsyncStorage or use default
  useEffect(() => {
    async function loadUser() {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          const savedUser = JSON.parse(jsonValue);
          setUser(savedUser);
          setFirstName(savedUser.firstName);
          setLastName(savedUser.lastName);
          setPassword(savedUser.password);
        }
      } catch (e) {
        console.error("Failed to load user", e);
      }
    }
    loadUser();
  }, []);

  // Save updated user
  const onSave = async () => {
    const updatedUser = { firstName, lastName, password };
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
      Alert.alert("Success", `User updated to ${firstName} ${lastName}`);
    } catch (e) {
      console.error("Failed to save user", e);
      Alert.alert("Error", "Could not save changes.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <Button title="Save" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 4,
  },
});
