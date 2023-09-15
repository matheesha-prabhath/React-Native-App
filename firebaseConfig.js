import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence  } from "firebase/auth";
import { ReactNativeAsyncStorage } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7iD8T4Fkf9WuVkFxqRjHKnHluXJkmhkY",
  authDomain: "got-app-2bd7d.firebaseapp.com",
  projectId: "got-app-2bd7d",
  storageBucket: "got-app-2bd7d.appspot.com",
  messagingSenderId: "1:578929766304:android:21115a7e30127f5916bec5",
  appId: "1:578929766304:android:21115a7e30127f5916bec5",
};

// Initialize Firebase app with your config
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default auth;
