import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFC00", // Snapchat yellow
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    color: "#000", // Black text on yellow
  },
  inputStyle: {
    height: 50,
    backgroundColor: "#fff", // White input boxes
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  buttonStyleSignUp: {
    backgroundColor: "#31adeb", // Black button
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff", // White text on black
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryText: {
    textAlign: "center",
    marginTop: 20,
    color: "#000",
    fontSize: 14,
  },
  signUpLink: {
    color: "#0000EE", // Optional: link-style blue
    fontWeight: "600",
  },
});
