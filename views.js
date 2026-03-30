import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const updateVideoViews = async (db, reelId) => {
    try {
        const reelRef = doc(db, "reels", reelId);
        await updateDoc(reelRef, {
            views: increment(1)
        });
    } catch (e) {
        console.log("Views error");
    }
};
