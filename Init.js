import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth'; // Import the necessary Firebase functions
import auth from './firebaseConfig';

function Init() {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log('Auth state changed:', authUser);
      setUser(authUser);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe(); // Unsubscribe from the auth state listener when the component unmounts
  }, [initializing]);

  useEffect(() => {
    // Check the user state here and navigate accordingly
    if (!initializing) {
      if (user) {
        navigation.navigate('Welcome');
      } else {
        navigation.navigate('SignIn');
      }
    }
  }, [initializing, user, navigation]);

  // Render a loading screen or nothing while initializing
  if (initializing) {
    return null; // You can render a loading indicator here if needed
  }

  // Render nothing here; navigation will handle the redirection
  return null;
}

export default Init;
