import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig'; // Double dot path fix
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import SignupScreen from './SignupScreen';

export default function Home() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Real-time user data fetch (Tokens, Location)
        const unsubData = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
          setLoading(false);
        });
        return () => unsubData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubAuth();
  }, []);

  if (loading) return <div style={centerStyle}><h1>GAJAN...</h1></div>;

  if (!user) {
    return <SignupScreen />;
  }

  return (
    <div style={containerStyle}>
      {/* --- Profile Header --- */}
      <div style={profileCard}>
        <div style={avatarStyle}>G</div>
        <h2 style={{ margin: '10px 0' }}>@{userData?.username || 'Gajan_User'}</h2>
        <div style={badgeStyle}>📍 Jamnagar Legend</div>
        
        <div style={statsContainer}>
          <div style={statBox}>
            <h1 style={{ color: '#FFD700', margin: '0' }}>🪙 {userData?.tokens || 1250}</h1>
            <p style={{ fontSize: '12px', color: '#aaa' }}>Gajan Tokens</p>
          </div>
        </div>
      </div>

      {/* --- Quick Actions --- */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button style={actionBtn}>❤️ Unique Like</button>
        <button style={actionBtn}>🎁 Send Gift</button>
      </div>

      <p style={{ marginTop: '40px', color: '#444', fontSize: '12px' }}>v1.0.0 - Secure Build</p>
    </div>
  );
}

// --- Styles (Automatic Clean UI) ---
const containerStyle = { backgroundColor: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', fontFamily: 'sans-serif' };
const centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000', color: '#fff' };
const profileCard = { width: '90%', maxWidth: '400px', backgroundColor: '#111', padding: '30px', borderRadius: '25px', textAlign: 'center', border: '1px solid #222' };
const avatarStyle = { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#8a2be2', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', fontWeight: 'bold' };
const badgeStyle = { backgroundColor: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' };
const statsContainer = { marginTop: '20px', borderTop: '1px solid #222', paddingTop: '20px' };
const statBox = { padding: '10px' };
const actionBtn = { backgroundColor: '#222', color: '#fff', border: '1px solid #444', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer' };
