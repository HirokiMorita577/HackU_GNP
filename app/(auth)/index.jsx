// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { handleLogin } from '../../firebase/authFunctions.js';
import { Platform } from 'react-native';
 function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLoginClick = async () => {
    const result = await handleLogin(email, password);
    
    if (result.success) {
      router.push("../(page)");
      // ログイン成功後の処理（例: ホーム画面に遷移）
    } else {
      if(Platform.OS!=="web")Alert.alert('ログイン失敗', result.error);
      if(Platform.OS==="web")window.alert('ログイン失敗！パスワードとIDが正しいか確かめてください');
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
      <Text style={styles.title}>ログイン</Text>
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
      <TouchableOpacity style={styles.button} onPress={()=>{handleLoginClick()}}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUpRedirect}>
        <Text style={styles.signUpText}>アカウントを持っていない方はこちら</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{handleTest()}}>
        <Text>テストボタン</Text>
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
  signUpText: {
    color: '#1E90FF',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
export default Login