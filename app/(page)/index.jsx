// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/ui/Header'; // パスは構成に合わせて変更
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  const handleSettingsPress = () => {
    // 例: 設定画面へ遷移
    router.push('/setting');
  };

  return (
    <View style={styles.container}>
      <Header title="ホーム" onSettingsPress={handleSettingsPress} />
      <View style={styles.content}>
        <Text style={styles.title}>ホーム画面</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
