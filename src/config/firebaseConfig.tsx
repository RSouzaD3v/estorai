// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "estoai.firebaseapp.com",
  projectId: "estoai",
  storageBucket: "estoai.appspot.com",
  messagingSenderId: "851248464898",
  appId: "1:851248464898:web:6dba61616ee0ae0201531b",
  measurementId: "G-RF37XWR3EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);