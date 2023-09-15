import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import FloatingLabelInput from "../components/FloatingLabelInput";
import auth from "../../firebaseConfig";

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(""); // State to store the user's name
  const [email, setEmail] = useState(""); // State to store the user's email

  // Function to fetch and update the user's name and email from Firebase
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser; // Get the current user

      if (user) {
        // User is signed in
        setName(user.displayName || ""); // Set the user's name if available
        setEmail(user.email || ""); // Set the user's email if available
      } else {
        // User is not signed in, handle accordingly
        // For example, navigate to the SignIn screen
        navigation.navigate("SignIn");
      }
    } catch (error) {
      // Handle any errors here
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Add a confirmation dialog before logging out
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              // Implement Firebase logout
              await auth.signOut();
              // Clear local data (if any)
              // ...
              // Navigate to the SignIn screen
              navigation.navigate("SignIn");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <View style={styles.form}>
        <View style={styles.InputContainer}>
          <FloatingLabelInput
            style={styles.input}
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.InputContainer}>
          <FloatingLabelInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          marginHorizontal: 12,
          width: "93%",
        }}
      >
        <Button title="Log out" onPress={handleLogout} />
      </View>
    </View>
  );
};

export default Profile;



const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2A2A2A",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginVertical: 110,
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  form: {
    marginHorizontal: 12,
  },
  InputContainer: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#3D3D3D",
    alignContent: "center",
  },
  inputHint: {
    color: "#C0C0C0",
  },
  input: {
    marginLeft: 5,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 40,
    color: "white",
  },
  signinContainer: {
    top: 250,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  signinWhite: {
    color: "white",
    fontWeight: "bold",
  },
  signin: {
    fontWeight: "bold",
    color: "#FFD482",
    borderBottomWidth: 1,
    borderColor: "#FFD482",
  },
});

