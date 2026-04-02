import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, runTransaction, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 👤 Profile Tap Fix
window.openUserProfile = (uid) => {
    if(uid) window.location.href = `user_profile.html?uid=${uid}`;
};

// ❤️ Like & Token Fix
window.handleLike = async (db, auth, rid, creatorUid, element) => {
    if(!auth.currentUser) return alert("Login please!");
    const heart = element.querySelector('.fa-heart');
    
    try {
        const reelRef = doc(db, "reels", rid);
        await updateDoc(reelRef, { likedBy: arrayUnion(auth.currentUser.uid) });
        heart.classList.add('text-red-500');
        heart.classList.remove('text-white');
    } catch (e) { console.error(e); }
};

// 🤝 Follow Fix
window.handleFollow = async (db, auth, targetUid, btn) => {
    if(!auth.currentUser || auth.currentUser.uid === targetUid) return;
    const myRef = doc(db, "users", auth.currentUser.uid);
    
    try {
        if(btn.innerText === "Follow") {
            await updateDoc(myRef, { following: arrayUnion(targetUid) });
            btn.innerText = "Following";
            btn.classList.add('opacity-50');
        } else {
            await updateDoc(myRef, { following: arrayRemove(targetUid) });
            btn.innerText = "Follow";
            btn.classList.remove('opacity-50');
        }
    } catch (e) { alert("Follow Error"); }
};

// 🚀 Share Fix
window.shareVideo = (rid) => {
    const shareUrl = window.location.href.split('?')[0] + "?id=" + rid;
    if (navigator.share) {
        navigator.share({ title: 'Gajan Insta', url: shareUrl });
    } else {
        window.open(`https://api.whatsapp.com/send?text=Check this: ${shareUrl}`);
    }
};
