import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Dhayan dein: yahan .. hai
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Sabhi pending withdrawal requests ko live dikhayega
    const unsub = onSnapshot(collection(db, "withdrawRequests"), (snap) => {
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const approvePayment = async (requestId) => {
    try {
      const reqRef = doc(db, "withdrawRequests", requestId);
      await updateDoc(reqRef, { status: "Approved" });
      alert("Gajan Admin: Payment Approve ho gayi!");
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#8a2be2', textAlign: 'center' }}>GAJAN ADMIN PANEL</h1>
      <p style={{ textAlign: 'center', color: '#aaa' }}>Sahi se check karke Pay karein</p>

      <div style={{ marginTop: '30px' }}>
        {requests.length === 0 ? <p style={{ textAlign: 'center' }}>Koi naya request nahi hai.</p> : null}
        
        {requests.map((req) => (
          <div key={req.id} style={{ border: '1px solid #333', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0', fontWeight: 'bold' }}>User: {req.userId}</p>
              <p style={{ margin: '0', color: '#FFD700' }}>Tokens: {req.amount}</p>
              <p style={{ margin: '0', color: '#00ff00' }}>UPI: {req.upiId}</p>
              <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>Status: {req.status}</p>
            </div>
            {req.status === "Pending" && (
              <button 
                onClick={() => approvePayment(req.id)}
                style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Approve & Pay
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
