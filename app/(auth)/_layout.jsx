// app/_layout.js
import { Slot } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot /> 
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200EE',
    padding: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
});
