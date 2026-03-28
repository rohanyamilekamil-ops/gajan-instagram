import { db } from './firebaseConfig';
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export const postComment = async (postId, userId, commentText) => {
  const postRef = doc(db, "posts", postId);
  // Comments sub-collection mein add karein
  await addDoc(collection(postRef, "comments"), {
    userId,
    text: commentText,
    timestamp: serverTimestamp()
  });
};
