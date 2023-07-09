// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCf0ZA3RH5lBBl6ZhGJNei8I0T2tDpyeQ4",
  authDomain: "propertymanager-8ec36.firebaseapp.com",
  projectId: "propertymanager-8ec36",
  storageBucket: "propertymanager-8ec36.appspot.com",
  messagingSenderId: "687327750213",
  appId: "1:687327750213:web:ab573f6fd7d98658379b2c",
};

let app;
// Initialize Firebase
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
}
export const db = getFirestore();
export const storage = getStorage();
export const googleAuthProvider = new GoogleAuthProvider();
