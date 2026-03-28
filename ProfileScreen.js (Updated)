const ProfileScreen = ({ user }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Header with Username */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Image source={{ uri: user.profilePic }} style={{ width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: '#purple' }} />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{user.username}</Text>
        <Text style={{ color: '#aaa' }}>📍 Jamnagar</Text>
      </View>

      {/* Stats Table */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 0.5, borderColor: '#333', padding: 15 }}>
        <View style={{ alignItems: 'center' }}><Text style={{ color: '#fff', fontWeight: 'bold' }}>{user.postsCount}</Text><Text style={{ color: '#aaa' }}>Posts</Text></View>
        <View style={{ alignItems: 'center' }}><Text style={{ color: '#fff', fontWeight: 'bold' }}>🪙 {user.tokens}</Text><Text style={{ color: '#aaa' }}>Tokens</Text></View>
        <View style={{ alignItems: 'center' }}><Text style={{ color: '#fff', fontWeight: 'bold' }}>{user.followers}</Text><Text style={{ color: '#aaa' }}>Followers</Text></View>
      </View>
    </View>
  );
};
