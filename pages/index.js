import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, updateDoc, collection } from "firebase/firestore";

export default function GajanSuperApp() {
  const [user, setUser] = useState(null);
  const [appSettings, setAppSettings] = useState({ themeColor: '#8a2be2', appName: 'GAJAN INSTA' });
  const [userData, setUserData] = useState({ tokens: 1250, username: 'Gajan_User' });

  useEffect(() => {
    // 1. App Settings (Admin Control) fetch
    onSnapshot(doc(db, "system", "settings"), (doc) => {
      if (doc.exists()) setAppSettings(doc.data());
    });

    // 2. User Data fetch
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onSnapshot(doc(db, "users", currentUser.uid), (d) => {
          if (d.exists()) setUserData(d.data());
        });
      }
    });
  }, []);

  // --- Admin Logic ---
  const updateAppTheme = async (newColor) => {
    await updateDoc(doc(db, "system", "settings"), { themeColor: newColor });
  };

  if (!user) return <div style={centerStyle}><h1>{appSettings.appName}</h1><p>Login to Continue...</p></div>;

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Header Managed by Admin */}
      <nav style={{ padding: '20px', borderBottom: `2px solid ${appSettings.themeColor}`, textAlign: 'center' }}>
        <h2 style={{ color: appSettings.themeColor }}>{appSettings.appName}</h2>
      </nav>

      <div style={container}>
        <div style={profileBox}>
          <div style={{...badge, backgroundColor: appSettings.themeColor}}>📍 Jamnagar Legend</div>
          <h1 style={{ fontSize: '60px', margin: '10px 0' }}>🪙 {userData.tokens}</h1>
          <p>Available Gajan Tokens</p>
        </div>

        {/* Admin Special Panel (Sirf aapke liye) */}
        {userData.isAdmin && (
          <div style={adminPanel}>
            <h3>🛠️ Super Admin Control</h3>
            <p>Change App Theme:</p>
            <input type="color" onChange={(e) => updateAppTheme(e.target.value)} />
            <button style={btn}>Approve 1000 Token Withdrawal</button>
          </div>
        )}
      </div>
    </div>
  );
}

const centerStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#000', color: '#fff' };
const container = { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const profileBox = { textAlign: 'center', background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #222', width: '90%', maxWidth: '400px' };
const badge = { color: '#000', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block' };
const adminPanel = { marginTop: '30px', background: '#1a1a1a', padding: '20px', borderRadius: '15px', width: '100%', border: '1px dashed yellow' };
const btn = { width: '100%', padding: '10px', marginTop: '10px', background: 'green', color: '#fff', border: 'none', borderRadius: '10px' };
        
