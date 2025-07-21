// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfFHnkmtfGvGPdinRI2Efsqqd-epSzOwI",
  authDomain: "recipesharingplatform-6474b.firebaseapp.com",
  projectId: "recipesharingplatform-6474b",
  storageBucket: "recipesharingplatform-6474b.firebasestorage.app",
  messagingSenderId: "7594350028",
  appId: "1:7594350028:web:5e4ccfdedff5a114f33969",
  measurementId: "G-19L1PSX1FS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };