import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

const BuyerScreen = ({ userId }) => {
  const [adminQR, setAdminQR] = useState(null);
  const [amount, setAmount] = useState('');
  const [transId, setTransId] = useState('');

  // 1. Admin ka current QR code fetch karna
  useEffect(() => {
    const fetchQR = async () => {
      const docRef = doc(db, "appConfig", "payments");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAdminQR(docSnap.data().qrCodeUrl);
      }
    };
    fetchQR();
  }, []);

  // 2. Token Purchase Request bhej na
  const handleBuyRequest = async () => {
    if (!amount || !transId) {
      Alert.alert("Galti", "Pehle payment karein aur Transaction ID dalein.");
      return;
    }

    await addDoc(collection(db, "tokenRequests"), {
      userId: userId,
      tokenAmount: parseInt(amount),
      transactionId: transId,
      status: "Pending", // Admin ise approve karega
      timestamp: new Date()
    });

    Alert.alert("Success", "Aapki request MRGAJAN (Admin) ko bhej di gayi hai. Verification ke baad tokens mil jayenge.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gajan Token Store</Text>
      
      {/* Admin QR Code Display */}
      <Text style={styles.subTitle}>Scan QR to Pay Admin</Text>
      {adminQR ? (
        <Image source={{ uri: adminQR }} style={styles.qrImage} />
      ) : (
        <Text style={{color: '#fff'}}>QR Code Loading...</Text>
      )}

      <View style={styles.inputArea}>
        <TextInput 
          placeholder="Kitne tokens chahiye?" 
          placeholderTextColor="#999"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={setAmount}
        />
        <TextInput 
          placeholder="Transaction ID (Utr)" 
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={setTransId}
        />
        
        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyRequest}>
          <Text style={styles.btnText}>Request Tokens</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
  subTitle: { color: '#FFD700', fontSize: 18, marginBottom: 10 },
  qrImage: { width: 250, height: 250, borderRadius: 10, borderWeight: 2, borderColor: '#fff' },
  inputArea: { width: '100%', marginTop: 30 },
  input: { backgroundColor: '#222', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  buyBtn: { backgroundColor: '#3897f0', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default BuyerScreen;
