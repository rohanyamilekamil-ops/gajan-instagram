import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Cloudinary Config
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/tiktok-clone-gajan/image/upload';
const UPLOAD_PRESET = 'gajan_preset'; 

export async function updateUserDetails(file, newName) {
    const auth = getAuth();
    const db = getFirestore();
    let photoURL = auth.currentUser.photoURL;

    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
        const data = await res.json();
        photoURL = data.secure_url;
    }

    await updateProfile(auth.currentUser, { displayName: newName, photoURL: photoURL });
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
        name: newName,
        photoURL: photoURL
    });
    
    return { success: true, url: photoURL };
}
