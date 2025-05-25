"use client";

// firebaseClient.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "prepwise-d28dd.firebaseapp.com",
  projectId: "prepwise-d28dd",
  storageBucket: "prepwise-d28dd.appspot.com", // fixed typo: `.app` → `.appspot.com`
  messagingSenderId: "18094927544",
  appId: "1:18094927544:web:3d023d21c7c341aaddce4d",
  measurementId: "G-YR9LH3GLPG",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional and safe analytics setup
let analytics;
if (typeof window !== "undefined") {
  const { getAnalytics } = await import("firebase/analytics");
  analytics = getAnalytics(app);
}
