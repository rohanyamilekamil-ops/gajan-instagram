import { db } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const uploadStory = async (userId, mediaUrl, mediaType) => {
  await addDoc(collection(db, "stories"), {
    userId,
    mediaUrl,
    mediaType, // 'image' or 'video'
    likes: [], // Kis kis ne like kiya
    timestamp: serverTimestamp(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours logic
  });
};
