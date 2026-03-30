import { getFirestore, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const followUser = async (db, myUid, targetUid) => {
    if(myUid === targetUid) return;
    const myRef = doc(db, "users", myUid);
    await updateDoc(myRef, { following: arrayUnion(targetUid) });
    alert("Followed successfully!");
};
