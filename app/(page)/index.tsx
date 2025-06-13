import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/ui/Header';

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const handleSettingsPress = () => {
    router.push('../setting');
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
