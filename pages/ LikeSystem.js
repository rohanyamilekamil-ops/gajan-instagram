import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const handleLike = async (postId, userId, hasLiked) => {
  const postRef = doc(db, "posts", postId);
  if (hasLiked) {
    await updateDoc(postRef, { likes: arrayRemove(userId) });
  } else {
    await updateDoc(postRef, { likes: arrayUnion(userId) });
  }
};
