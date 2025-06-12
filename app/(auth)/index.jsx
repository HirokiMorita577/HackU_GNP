import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { handleLogin } from '../../firebase/authFunctions.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [banana, setBanana] = useState('ログイン');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const data = [
    { id: '1', name: 'ログイン' },
    { id: '2', name: 'サインイン' },
    { id: '3', name: 'ゲスト' },
  ];

  const handleLoginClick = async () => {
    if (!email) {
      Alert.alert('エラー', 'メールアドレスを入力してください');
      return;
    }

    if (password.length < 8) {
      Alert.alert('エラー', 'パスワードは8文字以上で入力してください');
      return;
    }

    try {
      const result = await handleLogin(email, password);

      if (result.success) {
        router.push('../(page)');
      } else {
        Alert.alert('ログイン失敗', 'パスワードとIDが正しいか確かめてください');
      }
    } catch (error) {
      Alert.alert('エラー', 'ログイン中に問題が発生しました');
      console.error('Login error:', error);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('./sign-up');
  };

  const handleTest = () => {
    router.push('../(page)');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => setBanana(item.name)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ maxHeight: 150 }}
      />

      <Text style={styles.title}>{banana}</Text>

      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginClick}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUpRedirect}>
        <Text style={styles.signUpText}>アカウントを持っていない方はこちら</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleTest}>
        <Text>テストボタン</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(190, 228, 210)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 35,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  signUpText: {
    color: '#1E90FF',
    fontSize: 16,
    margin: 30,
  },
});

export default Login;