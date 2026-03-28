import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const GiftModal = ({ onSendGift }) => {
  const tokenOptions = [10, 50, 100, 500]; // User choice options

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
      {tokenOptions.map(amount => (
        <TouchableOpacity 
          key={amount} 
          onPress={() => onSendGift(amount)}
          style={{ backgroundColor: '#8a2be2', padding: 8, borderRadius: 20 }}
        >
          <Text style={{ color: '#fff' }}>🎁 {amount}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
