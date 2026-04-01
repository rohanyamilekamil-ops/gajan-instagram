import { getFirestore, doc, runTransaction, increment, arrayUnion } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export async function handleLikeToken(db, rid, creatorUid, myUid) {
    if (myUid === creatorUid) return "Self like";
    
    try {
        await runTransaction(db, async (t) => {
            const myWallet = doc(db, "wallets", myUid);
            const hisWallet = doc(db, "wallets", creatorUid);
            const reelRef = doc(db, "reels", rid);
            
            const mySnap = await t.get(myWallet);
            if (!mySnap.exists() || mySnap.data().balance < 1) throw "No Tokens";

            t.update(myWallet, { balance: increment(-1) });
            t.set(hisWallet, { balance: increment(1) }, { merge: true });
            t.update(reelRef, { likedBy: arrayUnion(myUid) });
        });
        return "Success";
    } catch (e) { throw e; }
}
