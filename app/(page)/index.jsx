// screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Header from '../../components/ui/Header';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  const [roomNumber, setRoomNumber] = useState('');
  const roomList = [
    { id: '101', name: 'Room 101' },
    { id: '202', name: 'Room 202' },
    { id: '303', name: 'Room 303' },
    { id: '404', name: 'Room 404' },
  ];

  // 入力に応じてリアルタイムでフィルタリング（部分一致）
  const filteredRooms = roomList.filter((room) =>
    room.id.includes(roomNumber)
  );

  const handleSettingsPress = () => {
    router.push('/setting');
  };

  return (
    <View style={styles.container}>
      <Header title="ホーム" onSettingsPress={handleSettingsPress} />

      <View style={styles.content}>
        <Text style={styles.title}>ホーム画面</Text>

        {/* 🔽 検索バーと結果表示 */}
        <View style={styles.searchContainer}>
          <View style={styles.searchRow}>
            <TextInput
              placeholder="番号を検索"
              style={styles.input}
              value={roomNumber}
              onChangeText={setRoomNumber}
              keyboardType="numeric"
            />
          </View>

          <FlatList
            data={filteredRooms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.roomItem}
                
              >
                <Text style={styles.roomText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={{ marginTop: 10, color: '#999' }}>
                該当する部屋が見つかりません
              </Text>
            }
            style={styles.roomList}
          />
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
  },
  roomItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    marginVertical: 3,
    alignItems: 'center',
  },
  roomText: {
    fontSize: 15,
    textAlign: 'center',
  },
  roomList: {
    width: '100%',
  },
});

export default HomeScreen;
