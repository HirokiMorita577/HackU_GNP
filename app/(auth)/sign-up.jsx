// SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert ,Image,Linking,Switch} from 'react-native';
import { useRouter } from 'expo-router';
import { handleSignUp } from '../../firebase/authFunctions.js';

export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [secureText, setSecureText] = useState(true);
  const [agreed, setAgreed] = useState(false);

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


  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/sign-up_illustration.png')}
        style={styles.image}
        resizeMode="cover"
      />
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
      <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#000', borderWidth: 1, borderRadius: 5, marginBottom: 20 }}>
        <TextInput
          style={{ flex: 1, height: 50, paddingHorizontal: 15 }}
          placeholder="パスワード"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)} style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: '#1E90FF' }}>{secureText ? '表示' : '非表示'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Switch
          value={agreed}
          onValueChange={setAgreed}
          thumbColor={agreed ? '#1E90FF' : '#808080'}
        />
        <TouchableOpacity onPress={() => router.push('/TermsOfService')} style={{ marginLeft: 10 }}>
          <Text style={{ color: '#1E90FF', textDecorationLine: 'underline' }}>
            利用規約
          </Text>
        </TouchableOpacity>
        <Text style={{ marginLeft: 5 }}>に同意します</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: agreed ? '#1E90FF' : '#a0cfff' }]}
        disabled={!agreed}
        onPress={() => handleSignUpClick()}
      >
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
    backgroundColor: '#e6f0ff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: 66,
    paddingBottom: "auto",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    borderRadius: 20,
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
