import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN25g00O_44TR7dU9z4200_Tc52MS8XrY",
  authDomain: "prepwise-d28dd.firebaseapp.com",
  projectId: "prepwise-d28dd",
  storageBucket: "prepwise-d28dd.firebasestorage.app",
  messagingSenderId: "18094927544",
  appId: "1:18094927544:web:3d023d21c7c341aaddce4d",
  measurementId: "G-YR9LH3GLPG",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
