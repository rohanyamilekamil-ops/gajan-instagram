import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Double dot zaroori hai
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username,
        tokens: 0,
        location: "Jamnagar",
        profilePic: "https://via.placeholder.com/150"
      });
      alert("Gajan App mein Swagat hai! Account ban gaya.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: '50px', color: '#fff', textAlign: 'center' }}>
      <h1>GAJAN</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} style={inputStyle} /><br/>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={inputStyle} /><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={inputStyle} /><br/>
      <button onClick={handleSignup} style={btnStyle}>Sign Up</button>
    </div>
  );
}

const inputStyle = { padding: '10px', margin: '10px', width: '80%', borderRadius: '5px' };
const btnStyle = { padding: '10px 20px', backgroundColor: '#8a2be2', color: '#fff', border: 'none', borderRadius: '5px' };
