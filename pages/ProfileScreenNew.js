import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Dhayan dein: yahan .. hai
import { doc, onSnapshot } from "firebase/firestore";

const ProfileScreenNew = ({ userId }) => {
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    // Real-time token updates (1250 tokens automatic dikhenge)
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
      setTokens(doc.data()?.tokens || 0);
    });
    return unsub;
  }, [userId]);

  return (
    <div style={{ background: '#000', color: '#fff', padding: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '24px', color: '#FFD700' }}>🪙 {tokens} Tokens</div>
      <p>📍 Jamnagar, Gujarat</p>
      <div style={{ border: '1px solid #333', padding: '10px' }}>
         {/* Posts and Unique Likes logic yahan aayega */}
      </div>
    </div>
  );
};

export default ProfileScreenNew;
