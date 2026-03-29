import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function GajanApp() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ tokens: 1250, username: 'Gajan User' });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Real-time Tokens & Data fetch
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          if (doc.exists()) setUserData(doc.data());
        });
      }
    });
    return unsubAuth;
  }, []);

  if (!user) return <div style={centerStyle}><h1>GAJAN</h1><p>Please Login/Signup...</p></div>;

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      {/* Profile Header */}
      <div style={profileCard}>
        <h2>@{userData.username}</h2>
        <div style={badge}>📍 Jamnagar Legend</div>
        <h1 style={{ color: '#FFD700', fontSize: '50px' }}>🪙 {userData.tokens}</h1>
        <p>Gajan Tokens Available</p>
      </div>

      {/* Unique Like Button Logic Placeholder */}
      <div style={{ marginTop: '20px' }}>
        <button style={btnStyle}>❤️ Like (Unique)</button>
        <button style={btnStyle}>🎁 Send Gift (10, 50, 100)</button>
      </div>
    </div>
  );
}

const centerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#000', color: '#fff' };
const profileCard = { textAlign: 'center', border: '1px solid #333', padding: '30px', borderRadius: '20px', background: '#111' };
const badge = { backgroundColor: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold' };
const btnStyle = { margin: '10px', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: '#8a2be2', color: '#fff' };
