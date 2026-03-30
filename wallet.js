import { db } from "./firebaseConfig";
import { doc, updateDoc, increment, addDoc, collection } from "firebase/firestore";

// User to User Token Send
export const sendTokens = async (senderId, receiverId, amount) => {
  if (amount > 100) return alert("Maximum limit 100 tokens hai!");
  
  const senderRef = doc(db, "users", senderId);
  const receiverRef = doc(db, "users", receiverId);

  await updateDoc(senderRef, { tokens: increment(-amount) });
  await updateDoc(receiverRef, { tokens: increment(amount) });
  alert("Tokens Sent Successfully!");
};

// Withdrawal System (Minimum 100 Tokens)
export const requestWithdrawal = async (userId, amount, upiId) => {
  if (amount < 100) return alert("Kam se kam 100 token hone chahiye!");

  await addDoc(collection(db, "withdrawals"), {
    userId,
    amount,
    upiId,
    status: "pending",
    date: new Date()
  });
  
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { tokens: increment(-amount) });
  alert("Withdrawal request sent to Admin!");
};
