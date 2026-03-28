// Firestore Query: Sirf wahi stories laayein jo expires nahi hui hain
const q = query(collection(db, "stories"), where("expiresAt", ">", new Date()));
