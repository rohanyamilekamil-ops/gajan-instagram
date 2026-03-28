import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const WithdrawScreen = ({ userId }) => {
  const [amount, setAmount] = useState('');
  const [upi, setUpi] = useState('');

  return (
    <View style={{ padding: 20, backgroundColor: '#000' }}>
      <Text style={{ color: '#fff' }}>Withdraw Tokens (Min 1000)</Text>
      <TextInput 
        placeholder="Tokens (e.g. 1000)" 
        onChangeText={setAmount} 
        style={{ backgroundColor: '#fff', marginVertical: 10 }}
      />
      <TextInput 
        placeholder="Your UPI ID" 
        onChangeText={setUpi} 
        style={{ backgroundColor: '#fff', marginBottom: 20 }}
      />
      <Button title="Withdraw Now" onPress={() => withdrawTokens(userId, amount, upi)} />
    </View>
  );
};
