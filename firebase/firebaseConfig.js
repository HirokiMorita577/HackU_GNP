// firebase/config.js など
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDmHlfY1-CksTApq_UapCmFauuaS5sOFxM",
  authDomain: "hackugnp.firebaseapp.com",
  projectId: "hackugnp",
  storageBucket: "hackugnp.appspot.com",
  messagingSenderId: "491096631657",
};

export const firebaseApp = initializeApp(firebaseConfig);
