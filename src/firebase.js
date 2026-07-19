// Firebase SDK Yapılandırması
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Web uygulamanızın Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyAtGH-G0UOWw2Pu9eZbnd0p2uM27ls-PbM",
  authDomain: "mysite-f934b.firebaseapp.com",
  projectId: "mysite-f934b",
  storageBucket: "mysite-f934b.firebasestorage.app",
  messagingSenderId: "1092688164149",
  appId: "1:1092688164149:web:9c8f1ea689ee0c6238887c",
  measurementId: "G-030MNMDR5W",
  databaseURL: "https://mysite-f934b-default-rtdb.firebaseio.com" // Firebase Realtime Database URL
};

// Firebase'i Başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);

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
