// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FlatList} from 'react-native';
//import { handleLogin } from '../../firebase/authFunctions.js';

 function Login() {
  const [email, setEmail] = useState('');
  const [buttonText, setButtonText] = useState('ログイン');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [banana, setBanana] = useState("ログイン");
  const data = [
  { id: '1', name: 'バナナ' },
  { id: '2', name: 'ばなな' },
  { id: '3', name: 'BANANA' },
  { id: '4', name: 'ババナ' },
  { id: '5', name: 'banana' },
  { id: '6', name: 'バナナ' },
  { id: '7', name: 'バナケン' },
  { id: '8', name: 'レイシヲ' },
  { id: '9', name: 'バナナ' },
];
/*
  const handleLoginClick = async () => {
    const result = await handleLogin(email, password);
    
    if (result.success) {
      Alert.alert('ログイン成功', 'ようこそ！');
      // ログイン成功後の処理（例: ホーム画面に遷移）
    } else {
      Alert.alert('ログイン失敗', result.error);
    }
  };
*/
  const handleSignUpRedirect = () => {
    router.push('./sign-up');
    handleLogin()
  };
  const handleLogin = () => {
  if (!email) {
    Alert.alert('エラー', 'メールアドレスを入力してください');
    return;
  }

  if (password.length < 8) {
    Alert.alert('エラー', 'パスワードは8文字以上で入力してください');
    return;
  }

  // ここから先はバリデーション成功後の処理
  Alert.alert('成功', 'ログイン処理を進めます');
};

  return (
    
    <View style={styles.container}>
      <FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={()=>{
        setBanana(item.name)
        console.log("これれれれれ")
      }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    </View>
  )}
  style={{ maxHeight: 150 }} // ★ 高さ制限
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
      secureTextEntry={!showPassword} // ここで showPassword を使う
    />
     <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Text style={{ textAlign: 'right', marginBottom: 20 }}>
        {showPassword ? '🙈 パスワードを隠す' : '👁️ パスワードを表示'}
      </Text>
    </TouchableOpacity>
      <TouchableOpacity
  style={styles.button}
  onPress={() =>
    setButtonText((prev) =>
      prev === 'ログイン' ? 'クリックされました' : 'ログイン'
    )
  }
>
  <Text style={styles.buttonText}>{buttonText}</Text>
</TouchableOpacity>


      <TouchableOpacity onPress={handleSignUpRedirect}>
        <Text style={styles.signUpText}>アカウントを持っていない方はこちら</Text>
      </TouchableOpacity>
    </View>
  );
}

// スタイル
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(190, 228, 210)",
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
    margin:30,
  },
  
});
export default Login