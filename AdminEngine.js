import { db } from './config';
import { doc, updateDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

// --- 1. GIFT & TOKEN SYSTEM ---
export const sendAdminGift = async (userId, tokenAmount) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { 
    tokens: tokenAmount,
    lastGiftDate: serverTimestamp() 
  });
  alert("Gift Tokens Sent!");
};

// --- 2. CHAT & MESSAGE CONTROL ---
export const sendSystemMessage = async (userId, messageText) => {
  await addDoc(collection(db, "chats"), {
    to: userId,
    from: "SYSTEM_ADMIN",
    text: messageText,
    timestamp: serverTimestamp()
  });
};

// --- 3. REELS & VIDEO FEED SETTINGS ---
export const updateReelDetails = async (reelId, data) => {
  const reelRef = doc(db, "reels", reelId);
  await updateDoc(reelRef, {
    views: data.views,
    likes: data.likes,
    songTitle: data.songName,
    isTrending: data.trending
  });
};

// --- 4. WITHDRAWAL APPROVAL ---
export const approveWithdrawal = async (requestId) => {
  const requestRef = doc(db, "withdrawals", requestId);
  await updateDoc(requestRef, { status: "COMPLETED" });
  alert("Payment Approved!");
};
