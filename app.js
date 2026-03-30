import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDMqxLOVO6iB5OTL4_KyiU1ddmf8T3P22Q",
    authDomain: "tiktok-clone-gajan.firebaseapp.com",
    projectId: "tiktok-clone-gajan",
    storageBucket: "tiktok-clone-gajan.firebasestorage.app",
    messagingSenderId: "838023307513",
    appId: "1:838023307513:web:e40efbaf7c3dbf16158228"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Profile Photo Upload to Cloudinary
document.getElementById('profile-upload').onchange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gajan_uploads");
    
    const res = await fetch(`https://api.cloudinary.com/v1_1/dvfgzrxs7/image/upload`, { method: "POST", body: formData });
    const data = await res.json();
    
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { photoURL: data.secure_url });
    document.getElementById('user-avatar').src = data.secure_url;
    alert("Photo Updated!");
};

window.logout = () => signOut(auth);
