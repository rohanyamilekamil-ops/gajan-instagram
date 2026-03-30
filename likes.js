import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const toggleLike = async (db, reelId, userId, isLiked) => {
    const reelRef = doc(db, "reels", reelId);
    if (isLiked) {
        // Agar pehle se liked hai toh hata do
        await updateDoc(reelRef, { likedBy: arrayRemove(userId) });
    } else {
        // Naya like add karo
        await updateDoc(reelRef, { likedBy: arrayUnion(userId) });
    }
};
