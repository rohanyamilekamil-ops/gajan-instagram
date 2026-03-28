import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, onSnapshot } from "firebase/firestore";

export default function ProfileScreen({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
      setUserData(doc.data());
    });
    return unsub;
  }, [userId]);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', height: '100vh', padding: '20px' }}>
      <div style={{ textAlign: 'center' }}>
         <img src={userData?.profilePic} style={{ width: '100px', borderRadius: '50%', border: '2px solid #purple' }} />
         <h2>@{userData?.username}</h2>
         <div style={{ backgroundColor: '#FFD700', color: '#000', padding: '5px', borderRadius: '20px', display: 'inline-block' }}>
            👑 Jamnagar Legend
         </div>
      </div>
      <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px', textAlign: 'center' }}>
         <h1 style={{ color: '#FFD700' }}>🪙 {userData?.tokens || 0}</h1>
         <p>Tokens in Wallet</p>
      </div>
    </div>
  );
}
