import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ここに直接Firebaseの設定を書きます
const firebaseConfig = {
  apiKey: "あなたのAPIキー",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxxxxxxxx"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// FirestoreとAuthをエクスポート
export const db = getFirestore(app);
export const auth = getAuth(app);
