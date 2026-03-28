// User ke header mein ye logic dalein
const [myTokens, setMyTokens] = useState(0);

useEffect(() => {
  const unsub = onSnapshot(doc(db, "users", currentUserId), (doc) => {
    setMyTokens(doc.data()?.tokens || 0);
  });
  return unsub;
}, []);

// UI mein: <Text>🪙 {myTokens}</Text>
