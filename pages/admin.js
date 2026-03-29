import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "withdrawRequests"), (snap) => {
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const approve = async (id) => {
    await updateDoc(doc(db, "withdrawRequests", id), { status: "Paid ✅" });
    alert("Gajan Admin: Payment Approved!");
  };

  return (
    <div style={{ background: '#000', color: '#fff', padding: '20px' }}>
      <h1 style={{ color: '#8a2be2' }}>MRGAJAN Control Panel</h1>
      {requests.map(r => (
        <div key={r.id} style={{ border: '1px solid #333', padding: '15px', margin: '10px 0' }}>
          <p>User ID: {r.userId} | Amount: {r.amount} Tokens</p>
          <button onClick={() => approve(r.id)} style={{ background: 'green', color: '#fff', border: 'none', padding: '10px' }}>Approve Payment</button>
        </div>
      ))}
    </div>
  );
}
