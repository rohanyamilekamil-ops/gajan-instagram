import { db } from './firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const handleLike = async (postId, userId, hasLiked) => {
  const postRef = doc(db, "posts", postId);
  
  if (hasLiked) {
    // Agar pehle se like hai to remove karo
    await updateDoc(postRef, {
      likes: arrayRemove(userId)
    });
  } else {
    // Naya like add karo
    await updateDoc(postRef, {
      likes: arrayUnion(userId)
    });
  }
};
