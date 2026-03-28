import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Firebase Console se copy karein
  authDomain: "tiktok-clone-gajan.firebaseapp.com",
  projectId: "tiktok-clone-gajan",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
