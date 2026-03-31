// feed_fix.js - Real-time PFP Fetcher
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export async function getCreatorPFP(db, uid) {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists() && userDoc.data().photoURL) {
        return userDoc.data().photoURL;
    }
    return "https://via.placeholder.com/150"; // Default photo
}
