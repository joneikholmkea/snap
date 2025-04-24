import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { styles } from "../style";

export default function SignUp({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) =>
        console.log("Signed up with:", userCredentials.user.email)
      )
      .catch((error) => console.log("Error:", error.message))
      alert("Bad credentials");
  }

  return (
    <View
      style={
        styles.container
      }
    >
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputStyle}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputStyle}
      />

      <Pressable style={styles.buttonStyleSignUp} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Login")}>
  <Text style={{ color: "#000", textAlign: "center", marginTop: 20 }}>
    Already have an account? Log in
  </Text>
</Pressable>

    </View>
  );
}
