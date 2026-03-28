import { db } from './firebaseConfig';
import { doc, updateDoc, increment, addDoc, collection } from "firebase/firestore";

// Withdrawal Logic (Min 1000)
export const withdrawTokens = async (userId, amount, upiId) => {
  if (amount < 1000) {
    alert("Withdrawal ke liye 1000 tokens zaroori hain!");
    return;
  }
  await addDoc(collection(db, "withdrawRequests"), {
    userId, amount, upiId, status: "Pending", date: new Date()
  });
  await updateDoc(doc(db, "users", userId), { tokens: increment(-amount) });
  alert("Request Admin ko bhej di gayi hai!");
};

// Gifting Logic
export const sendGift = async (fromId, toId, value) => {
  await updateDoc(doc(db, "users", fromId), { tokens: increment(-value) });
  await updateDoc(doc(db, "users", toId), { tokens: increment(value) });
};
