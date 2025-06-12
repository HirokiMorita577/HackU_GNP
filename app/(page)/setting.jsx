import React, { useState ,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet,TouchableOpacity,Dimensions,TextInput,Image} from 'react-native';
import { useRouter } from 'expo-router';
const SettingScreen = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const [username, setUsername] = useState('');
  const [selectedMap, setSelectedMap] = useState('standard');

  const handleLogout = () => {
    console.log('ログアウトしました');
    router.replace('/(auth)');
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const loaded = await loadSettings();
      if (loaded) {
        setUsername(loaded.username || '');
        setSelectedMap(loaded.selectedMap || 'standard');
      }
    };
    fetchSettings();
  }, []);

  const saveSettings = async (settings) => {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem('@user_settings', jsonValue);
      console.log('設定を保存しました');
    } catch (e) {
      console.error('設定の保存に失敗しました', e);
    }
  };
  const loadSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_settings');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('設定の読み込みに失敗しました', e);
      return null;
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← 戻る</Text>
        </TouchableOpacity>
        <View style={[styles.titleContainer, { left: screenWidth / 2 - 40 }]}>
          <Text style={styles.title}>設定</Text>
        </View>
      </View>
      {/* 設定内容 */}
      <View style={styles.row}>
        <Text style={styles.label}>ユーザ名</Text>
        <TextInput
          style={styles.input}
          placeholder="ユーザ名を入力"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.content}>
        <Text>現在ログイン中のメールアドレス</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>ログアウト</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={{marginBottom: 8}}>地図の選択</Text>
        <View style={styles.mapToggleRow}>
          <TouchableOpacity onPress={() => setSelectedMap('satellite')}>
            <Image
              source={require('../../assets/satellite.png')}
              style={[
                styles.mapImage,
                selectedMap==='satellite'&&styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setSelectedMap('standard')}>
            <Image
              source={require('../../assets/standard_map.png')}
              style={[
                styles.mapImage,
                selectedMap==='standard'&& styles.selectedImage,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
        const settings = {username,selectedMap,};
        saveSettings(settings);
        console.log('設定を保存しました:', settings);
        }}
        >
        <Text style={styles.confirmButtonText}>決定</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
    height: 50,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    color: '#ccc',
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 14,
    marginRight: 8,
    width: 80,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 12,
    marginHorizontal: 20,
    backgroundColor: '#ff3b30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  mapToggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  mapImage: {
    width: 160,
    height: 120,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImage: {
    borderColor: '#007AFF',
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default SettingScreen;
