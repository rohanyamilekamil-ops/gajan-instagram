// admin_core.js - Safe Token Generation
import { getFirestore, doc, runTransaction, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export async function adminSendTokens(db, targetUid, amount) {
    const walletRef = doc(db, "wallets", targetUid);
    try {
        await runTransaction(db, async (transaction) => {
            transaction.set(walletRef, { 
                balance: increment(amount),
                lastUpdated: new Date()
            }, { merge: true });
        });
        return "✅ Tokens Generated & Sent!";
    } catch (e) {
        return "❌ Error: " + e.message;
    }
}
