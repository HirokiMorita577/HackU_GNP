// Firebaseの設定ファイル
// 下記の値はFirebaseコンソールから取得したものに書き換えてください

// Firebase Realtime Database 初期化用
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmHlfY1-CksTApq_UapCmFauuaS5sOFxM",
  authDomain: "hackugnp.firebaseapp.com",
  databaseURL: "https://hackugnp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hackugnp",
  storageBucket: "hackugnp.firebasestorage.app",
  messagingSenderId: "491096631657",
  appId: "1:491096631657:web:020f1284e03a4fc96c75f8",
  measurementId: "G-KRJM56CWYB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
