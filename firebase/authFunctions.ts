// firebase/authFunctions.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from './firebaseConfig'; // .tsなら拡張子不要

// 戻り値型
type AuthResult = 
  | { success: true; user: UserCredential['user'] }
  | { success: false; error: string };

// サインアップ処理
export const handleSignUp = async (
  email: string,
  password: string,
  name: string
): Promise<AuthResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('ユーザー作成成功', user);
    // 必要ならuser.displayNameの更新もここで
    return { success: true, user };
  } catch (error: any) {
    console.error('サインアップ失敗', error.code, error.message);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
};

// ログイン処理
export const handleLogin = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('ログイン成功', user);
    return { success: true, user };
  } catch (error: any) {
    console.error('ログイン失敗', error.code, error.message);
    return { success: false, error: error.message ?? 'Unknown error' };
  }
};
