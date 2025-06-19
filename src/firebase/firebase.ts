import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AlzaSyDmHlfY1-CksTApq_UapCmFauuaS5sOFxM",
  authDomain: "hackugnp.firebaseapp.com",
  projectId: "hackugnp",
  storageBucket: "hackugnp.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxxxxxxxx"
};
// すでに初期化済みか確認してから initializeApp を実行
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
