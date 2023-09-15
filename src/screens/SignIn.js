import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/Button";
import FloatingLabelInput from "../components/FloatingLabelInput";
import FloatingLabelPassword from "../components/FloatingLabelPassword";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebaseConfig";
import * as SecureStore from "expo-secure-store"; // Import SecureStore

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, store user authentication status in SecureStore
      await SecureStore.setItemAsync("userToken", "authenticated");

      navigation.navigate("Welcome");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      const userToken = await SecureStore.getItemAsync("userToken");
      if (userToken === "authenticated") {
        navigation.navigate("Welcome");
      }
    };

    checkAuthenticationStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <ScrollView style={styles.form}>
        <View style={styles.InputContainer}>
          <FloatingLabelInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.InputContainer}>
          <FloatingLabelPassword
            style={styles.input}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <Button title="Sign In" onPress={handleSignIn} />
      </ScrollView>
      <ScrollView contentContainerStyle={styles.signinContainer}>
        <Text style={styles.signinWhite}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signin}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignIn;



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2A2A2A",
    height: "100%",
    width: "100%",
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
    width: "100%",
    position: "absolute",
    bottom: 40,
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