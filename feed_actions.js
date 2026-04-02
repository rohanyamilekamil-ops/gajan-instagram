import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, runTransaction, increment, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ❤️ Like System Fix (Heart Red hoga aur Token Transfer hoga)
window.handleLike = async (db, auth, rid, creatorUid, element) => {
    if(!auth.currentUser) return alert("Login Karo!");
    if(auth.currentUser.uid === creatorUid) return;

    const heartIcon = element.querySelector('.fa-heart');
    try {
        await runTransaction(db, async (t) => {
            const myWallet = doc(db, "wallets", auth.currentUser.uid);
            const hisWallet = doc(db, "wallets", creatorUid);
            const reelRef = doc(db, "reels", rid);
            
            const mySnap = await t.get(myWallet);
            if (!mySnap.exists() || mySnap.data().balance < 1) throw "No Tokens! Buy Now.";

            t.update(myWallet, { balance: increment(-1) });
            t.set(hisWallet, { balance: increment(1) }, { merge: true });
            t.update(reelRef, { likedBy: arrayUnion(auth.currentUser.uid) });
        });
        
        heartIcon.classList.replace('text-white', 'text-red-500');
    } catch (e) { 
        if(e === "No Tokens! Buy Now.") showTokenPopup();
        else console.error(e); 
    }
};

// 🤝 Follow Button Fix
window.handleFollow = async (db, auth, targetUid, btn) => {
    if(!auth.currentUser || auth.currentUser.uid === targetUid) return;
    const myRef = doc(db, "users", auth.currentUser.uid);
    const targetRef = doc(db, "users", targetUid);

    try {
        if (btn.innerText === "Follow") {
            await updateDoc(myRef, { following: arrayUnion(targetUid) });
            await updateDoc(targetRef, { followers: arrayUnion(auth.currentUser.uid) });
            btn.innerText = "Following";
            btn.style.opacity = "0.5";
        } else {
            await updateDoc(myRef, { following: arrayRemove(targetUid) });
            await updateDoc(targetRef, { followers: arrayRemove(auth.currentUser.uid) });
            btn.innerText = "Follow";
            btn.style.opacity = "1";
        }
    } catch (e) { console.error("Follow Error", e); }
};

// 💰 Feed Buy Token Popup Logic
window.showTokenPopup = () => {
    document.getElementById('token-buy-modal').classList.remove('hidden');
};

window.hideTokenPopup = () => {
    document.getElementById('token-buy-modal').classList.add('hidden');
};

window.requestTokensFromFeed = async (db, auth) => {
    if(!auth.currentUser) return;
    await setDoc(doc(db, "token_requests", auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        name: auth.currentUser.displayName || "User",
        time: serverTimestamp(),
        status: "Paid_Pending"
    });
    alert("Request Sent! Admin QR check karke tokens bhej denge.");
    hideTokenPopup();
};
