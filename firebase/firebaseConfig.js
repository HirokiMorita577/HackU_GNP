
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
export const firebaseApp = initializeApp(firebaseConfig);


export const firestoreDb = getFirestore(firebaseApp);
export const realtimeDb = getDatabase(firebaseApp);



