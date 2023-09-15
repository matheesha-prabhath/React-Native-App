import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Welcome from './src/screens/Welcome';
import Profile from './src/screens/Profile';
import auth from './firebaseConfig';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Check if the user is already signed in using AsyncStorage
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          // User is signed in
          setUser(userToken);
        }
        setInitializing(false);
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    }
    checkAuthStatus();
  }, []);

  // Firebase authentication listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in, update AsyncStorage
        AsyncStorage.setItem('userToken', 'your-user-token-here');
        setUser(authUser);
      } else {
        // User is signed out, remove from AsyncStorage
        AsyncStorage.removeItem('userToken');
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe(); // Unsubscribe from the auth state listener when component unmounts
  }, []);

  if (initializing) {
    return <View />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="SignIn">
          <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
