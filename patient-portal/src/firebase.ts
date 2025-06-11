// @ts-nocheck
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChvue7hgYoCp0B-bI40RmHiAc4ymJ1ydg",
  authDomain: "x-heal.firebaseapp.com",
  projectId: "x-heal",
  storageBucket: "x-heal.firebasestorage.app",
  messagingSenderId: "860598018296",
  appId: "1:860598018296:web:45d1eebf8e68fb3e871b0d",
  measurementId: "G-8712HDB9N7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const rtdb = getDatabase(app);
const db = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, analytics, rtdb, db, storage }; 