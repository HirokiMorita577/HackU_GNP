import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase設定（Web用のappIdを使用）
const firebaseConfig = {
  apiKey: 'AIzaSyDmHlfY1-CksTApq_UapCmFauuaS5sOFxM',
  authDomain: 'hackugnp.firebaseapp.com',
  projectId: 'hackugnp',
  storageBucket: 'hackugnp.appspot.com',
  messagingSenderId: '491096631657',
  appId: '1:491096631657:web:020f1284e03a4fc96c75f8', // Web用appId
};

const app = initializeApp(firebaseConfig);

// 永続化なし（デフォルトでメモリ保持のみ）
export const auth = getAuth(app);

export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
