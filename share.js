import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const updateShareCount = async (db, reelId) => {
    const reelRef = doc(db, "reels", reelId);
    await updateDoc(reelRef, { sharesCount: increment(1) });
    alert("Shared to Gajan Network!");
};
