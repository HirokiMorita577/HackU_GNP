import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreen = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ここに地図が表示されます</h1>
      {/* ここに地図コンポーネントを追加予定 */}
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MapScreen;
