import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNSQNpq5TOytV1QrmFEWYKTxSF-Y5k878",
  authDomain: "group-hangout-planner.firebaseapp.com",
  projectId: "group-hangout-planner",
  storageBucket: "group-hangout-planner.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "535675082144",
  appId: "1:535675082144:web:33622c4d275c260a4400c5",
  measurementId: "G-1Q4N9JR6EP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
