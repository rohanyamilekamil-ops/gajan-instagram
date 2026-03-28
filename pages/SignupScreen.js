import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Dhayan: Yahan .. hai
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db, "users", user.user.uid), {
        username: name,
        tokens: 0,
        location: "Jamnagar"
      });
      alert("Welcome to Gajan!");
    } catch (e) { alert(e.message); }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', height: '100vh', padding: '20px', textAlign: 'center' }}>
      <h1>GAJAN</h1>
      <input type="text" placeholder="Username" onChange={e => setName(e.target.value)} style={inputStyle} /><br/>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} style={inputStyle} /><br/>
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} style={inputStyle} /><br/>
      <button onClick={register} style={{ backgroundColor: '#8a2be2', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Sign Up</button>
    </div>
  );
}
const inputStyle = { margin: '10px', padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #333', background: '#222', color: '#fff' };
