import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsM5SJzzvsqAaKaRgTJQDidE-jtdkPR-Y",
  authDomain: "invitaciones-matrimonio-18182.firebaseapp.com",
  projectId: "invitaciones-matrimonio-18182",
  storageBucket: "invitaciones-matrimonio-18182.firebasestorage.app",
  messagingSenderId: "814626684450",
  appId: "1:814626684450:web:8d10610084baca4ccf947b",
  measurementId: "G-XLPRTY7TCB"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization in Next.js dev server)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
