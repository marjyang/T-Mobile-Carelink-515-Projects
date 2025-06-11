import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyChvue7hgYoCp0B-bI40RmHiAc4ymJ1ydg",
  authDomain: "x-heal.firebaseapp.com",
  projectId: "x-heal",
  storageBucket: "x-heal.firebasestorage.app",
  messagingSenderId: "860598018296",
  appId: "1:860598018296:web:45d1eebf8e68fb3e871b0d",
  measurementId: "G-8712HDB9N7"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app; 