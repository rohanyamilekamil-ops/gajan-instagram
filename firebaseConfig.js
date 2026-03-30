import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMqxLOVO6iB5OTL4_KyiU1ddmf8T3P22Q",
  authDomain: "tiktok-clone-gajan.firebaseapp.com",
  projectId: "tiktok-clone-gajan",
  storageBucket: "tiktok-clone-gajan.firebasestorage.app",
  messagingSenderId: "838023307513",
  appId: "1:838023307513:web:e40efbaf7c3dbf16158228"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
