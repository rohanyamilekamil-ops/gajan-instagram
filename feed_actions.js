import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 👤 Profile par tap karne se user ki details khulegi
window.openUserProfile = (uid) => {
    if(uid) {
        window.location.href = `user_profile.html?uid=${uid}`;
    }
};

// 🤝 Follow/Unfollow Button Logic
window.handleFollow = async (db, auth, targetUid, btnElement) => {
    if(!auth.currentUser) return alert("Pehle login karein!");
    if(auth.currentUser.uid === targetUid) return alert("Aap khud ko follow nahi kar sakte!");

    const myRef = doc(db, "users", auth.currentUser.uid);
    const targetRef = doc(db, "users", targetUid);

    try {
        if (btnElement.innerText === "Follow") {
            await updateDoc(myRef, { following: arrayUnion(targetUid) });
            await updateDoc(targetRef, { followers: arrayUnion(auth.currentUser.uid) });
            btnElement.innerText = "Following";
            btnElement.style.opacity = "0.6";
        } else {
            await updateDoc(myRef, { following: arrayRemove(targetUid) });
            await updateDoc(targetRef, { followers: arrayRemove(auth.currentUser.uid) });
            btnElement.innerText = "Follow";
            btnElement.style.opacity = "1";
        }
    } catch (e) {
        console.error("Follow Error:", e);
    }
};
