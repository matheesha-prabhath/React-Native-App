import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/Button";
import FloatingLabelInput from "../components/FloatingLabelInput";
import FloatingLabelPassword from "../components/FloatingLabelPassword";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../firebaseConfig";

const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConfirmPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    lowC: false,
    upperC: false,
    digit: false,
    length: false,
  });

  const handleConfirmPassword = (text) => {
    setConfirmPassword(text);
  };

  const handlePasswordChange = (text) => {
    const validation = {
      lowC: /[a-z]/.test(text),
      upperC: /[A-Z]/.test(text),
      digit: /\d/.test(text),
      length: text.length >= 8,
    };

    setPasswordValidation(validation);
    setPassword(text);
  };

  const isPasswordValid = Object.values(passwordValidation).every(
    (isValid) => isValid
  );

  const getValidationImage = (isValid) =>
    isValid
      ? require("../../assets/interface/Check.png")
      : require("../../assets/interface/Reload.png");

  const renderValidationStatus = () => {
    return (
      <View style={styles.validationStatContainer}>
        <View style={styles.validationStatLeft}>
          <Text style={styles.validationStat}>
            <Image
              style={styles.validateImage}
              source={getValidationImage(passwordValidation.lowC)}
            />
            One lowercase character
          </Text>
          <Text style={styles.validationStat}>
            <Image
              style={styles.validateImage}
              source={getValidationImage(passwordValidation.upperC)}
            />
            One uppercase character
          </Text>
          <Text style={styles.validationStat}>
            <Image
              style={styles.validateImage}
              source={getValidationImage(passwordValidation.digit)}
            />
            One number
          </Text>
        </View>
        <View style={styles.validationStatRight}>
          <Text style={styles.validationStat}>
            <Image
              style={styles.validateImage}
              source={getValidationImage(passwordValidation.length)}
            />
            8 characters minimum
          </Text>
        </View>
      </View>
    );
  };

  const handleSignup = async () => {
    try {
      if (!isPasswordValid) {
        // Password does not meet the criteria
        Alert.alert(
          "Error",
          "Password must contain at least one lowercase character, one uppercase character, one number, and be 8 characters minimum."
        );
        return;
      }

      if (password !== conPassword) {
        // Password and confirm password do not match
        Alert.alert("Error", "Confirmation Password doesn't match");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the newly created user
      const user = userCredential.user;

      // Update the user's display name (name)
      await updateProfile(user, { displayName: name });

      // If successful, navigate to the main app screen
      navigation.navigate("Welcome");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <ScrollView style={styles.form}>
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
            label="Email Address"
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
            onChangeText={handlePasswordChange}
          />
        </View>
        <View style={styles.InputContainer}>
          <FloatingLabelPassword
            style={styles.input}
            label="Confirm Password"
            secureTextEntry
            value={conPassword}
            onChangeText={handleConfirmPassword}
          />
        </View>
        {renderValidationStatus()}
        <Button title="Sign Up" onPress={handleSignup} />
      </ScrollView>
      <ScrollView contentContainerStyle={styles.signupContainer}>
        <Text style={styles.signupWhite}>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signup}>Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignUp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
  },
  title: {
    marginVertical: 60,
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
  signupContainer: {
    width: "100%",
    position: "absolute",
    bottom: 40,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  signupWhite: {
    color: "white",
    fontWeight: "bold",
  },
  signup: {
    fontWeight: "bold",
    color: "#FFD482",
    borderBottomWidth: 1,
    borderColor: "#FFD482",
  },
  validationStatContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  validationStatLeft: {
    padding: 5,
  },
  validationStatRight: {
    padding: 5,
  },
  validateImage: {
    resizeMode: "center",
    width: 25,
    height: 25,
  },
  validationStat: {
    color: "white",
  },
});
