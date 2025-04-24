import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    Text,
    Pressable,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase";
import { styles } from "../style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const colorScheme = useColorScheme();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed as:", user.email);
            }
        });
        return unsubscribe;
    }, []);

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) =>
                console.log("Logged in with:", userCredentials.user.email)
            )
            .catch((error) => console.log("Error:", error.message));
    }

    return (
        <KeyboardAvoidingView
            style={[
                styles.container,
                { backgroundColor: colorScheme === "dark" ? "black" : "#FFFC00" },
            ]}
        >
            <View style={{  }}>
                <Text style={styles.title}>Log in</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputStyle}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.inputStyle}
                    placeholderTextColor="#aaa"
                />
                <Pressable style={styles.buttonStyleLogin} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable
                    style={styles.buttonStyleSignUp}
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}