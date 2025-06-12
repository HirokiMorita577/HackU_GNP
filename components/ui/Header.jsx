// components/ui/Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expoプロジェクトなら利用可能

const Header = ({ title, onSettingsPress }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity onPress={onSettingsPress} style={styles.button}>
      <Ionicons name="settings-outline" size={24} color="#333" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    padding: 8,
  },
});

export default Header;
