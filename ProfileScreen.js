import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const ProfileScreen = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", userId);
      const snap = await getDoc(docRef);
      setUserData(snap.data());
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData?.profilePic }} style={styles.avatar} />
      <Text style={styles.username}>@{userData?.username}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{userData?.tokens || 0}</Text>
          <Text style={styles.statLabel}>Tokens</Text>
        </View>
      </View>
      <Text style={styles.bio}>📍 Jamnagar | Content Creator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', paddingTop: 50 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWeight: 2, borderColor: '#3897f0' },
  username: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  statsRow: { flexDirection: 'row', marginTop: 20, borderTopWidth: 0.5, borderColor: '#333', width: '100%', justifyContent: 'center' },
  statBox: { alignItems: 'center', padding: 20 },
  statNum: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#999' },
  bio: { color: '#ccc', marginTop: 10 }
});

export default ProfileScreen;
