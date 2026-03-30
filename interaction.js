import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Like toggle logic
export const handleLikeAction = async (db, reelId, userId, isLiked) => {
    const ref = doc(db, "reels", reelId);
    if (isLiked) {
        await updateDoc(ref, { likedBy: arrayRemove(userId) });
    } else {
        await updateDoc(ref, { likedBy: arrayUnion(userId) });
    }
};

// View count logic
export const addView = async (db, reelId) => {
    const ref = doc(db, "reels", reelId);
    await updateDoc(ref, { views: increment(1) });
};
