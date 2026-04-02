import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, runTransaction, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ❤️ Like & Token Transfer Fix
window.handleLike = async (db, auth, rid, creatorUid, element) => {
    if(!auth.currentUser) return alert("Bhai, pehle Login kar lo!");
    if(auth.currentUser.uid === creatorUid) return; // Khud ki video par token nahi milega

    const heartIcon = element.querySelector('.fa-heart');
    
    try {
        await runTransaction(db, async (transaction) => {
            const myWalletRef = doc(db, "wallets", auth.currentUser.uid);
            const hisWalletRef = doc(db, "wallets", creatorUid);
            const reelRef = doc(db, "reels", rid);

            const mySnap = await transaction.get(myWalletRef);
            const reelSnap = await transaction.get(reelRef);

            // Check if already liked
            if (reelSnap.data().likedBy && reelSnap.data().likedBy.includes(auth.currentUser.uid)) {
                throw "Pehle se Liked hai!";
            }

            // Check Balance
            if (!mySnap.exists() || mySnap.data().balance < 1) {
                throw "Tokens Khatam! Buy now.";
            }

            // Execute Transaction
            transaction.update(myWalletRef, { balance: increment(-1) });
            transaction.set(hisWalletRef, { balance: increment(1) }, { merge: true });
            transaction.update(reelRef, { likedBy: arrayUnion(auth.currentUser.uid) });
        });

        // UI Update: Heart Red ho jayega
        heartIcon.classList.replace('text-white', 'text-red-500');
        console.log("Like Successful!");

    } catch (e) {
        if(e === "Tokens Khatam! Buy now.") {
            document.getElementById('token-buy-modal').classList.remove('hidden');
        } else {
            console.error("Like Error:", e);
        }
    }
};

// 🤝 Follow/Unfollow Fix
window.handleFollow = async (db, auth, targetUid, btn) => {
    if(!auth.currentUser || auth.currentUser.uid === targetUid) return;

    const myRef = doc(db, "users", auth.currentUser.uid);
    const targetRef = doc(db, "users", targetUid);

    try {
        if (btn.innerText === "Follow") {
            // Follow logic
            await updateDoc(myRef, { following: arrayUnion(targetUid) });
            await updateDoc(targetRef, { followers: arrayUnion(auth.currentUser.uid) });
            btn.innerText = "Following";
            btn.style.opacity = "0.5";
        } else {
            // Unfollow logic
            await updateDoc(myRef, { following: arrayRemove(targetUid) });
            await updateDoc(targetRef, { followers: arrayRemove(auth.currentUser.uid) });
            btn.innerText = "Follow";
            btn.style.opacity = "1";
        }
    } catch (e) {
        console.error("Follow Error:", e);
    }
};
