// Firebase SDK Yapılandırması
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Web uygulamanızın Firebase yapılandırması (Environment Variables ile güvenli)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAtGH-G0UOWw2Pu9eZbnd0p2uM27ls-PbM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mysite-f934b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mysite-f934b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mysite-f934b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1092688164149",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1092688164149:web:9c8f1ea689ee0c6238887c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-030MNMDR5W",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://mysite-f934b-default-rtdb.europe-west1.firebasedatabase.app"
};

// Firebase'i Başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app, firebaseConfig.databaseURL);

// Analytics desteğini güvenli şekilde başlat
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, db, rtdb };
export default app;
