// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPdmjjCMPw_62j1maFgnuE4zynmO485Kk",
  authDomain: "uts-lab-70666.firebaseapp.com",
  projectId: "uts-lab-70666",
  storageBucket: "uts-lab-70666.appspot.com",
  messagingSenderId: "501024539404",
  appId: "1:501024539404:web:a5fb295ba76cee21b5bf29",
  measurementId: "G-T7FYX80T6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };