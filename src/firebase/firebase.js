// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL8Fhvf8KC1AqABMkaLwE65YA5oM7LqlQ",
  authDomain: "startuplegal-941de.firebaseapp.com",
  projectId: "startuplegal-941de",
  storageBucket: "startuplegal-941de.appspot.com",
  messagingSenderId: "278690618813",
  appId: "1:278690618813:web:feee2ad31add47ab9a86d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth();

export const db = getFirestore(app);
