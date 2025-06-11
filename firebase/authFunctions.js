// firebase/authFunctions.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from './firebaseConfig.js'; // firebase/config.jsから設定をインポート

// Firebase Authenticationのインスタンスを取得
const auth = getAuth(firebaseApp);

// サインアップ処理
export const handleSignUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('ユーザー作成成功', user);
    return { success: true, user };
  } catch (error) {
    console.error('サインアップ失敗', error.code, error.message); // エラーコードとメッセージを表示
    return { success: false, error: error.message };
  }
};

export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('ログイン成功', user);
    return { success: true, user };
  } catch (error) {
    console.error('ログイン失敗', error.code, error.message); // エラーコードとメッセージを表示
    return { success: false, error: error.message };
  }
};

