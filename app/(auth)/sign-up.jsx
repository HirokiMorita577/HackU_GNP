// SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
//import { handleSignUp } from '../../firebase/authFunctions.js';

export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
/*
  const handleSignUpClick = async () => {
    if (name && email && password) {
      const result = await handleSignUp(email, password, name);
      
      if (result.success) {
        Alert.alert('サインアップ成功', 'アカウントが作成されました！');
        router.back();
      } else {
        Alert.alert('サインアップ失敗', result.error);
      }
    } else {
      Alert.alert('サインアップ失敗', 'すべてのフィールドを入力してください');
    }
  };
*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>サインアップ</Text>
      <TextInput
        style={styles.input}
        placeholder="名前"
        value={name}
        onChangeText={setName}
      />
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
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>サインアップ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.loginText}>すでにアカウントをお持ちの方はこちら</Text>
      </TouchableOpacity>
    </View>
  );
}

// スタイル
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
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
  loginText: {
    color: '#1E90FF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
