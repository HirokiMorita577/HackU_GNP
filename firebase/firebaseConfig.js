// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmHlfY1-CksTApq_UapCmFauuaS5sOFxM",
  authDomain: "hackugnp.firebaseapp.com",
  projectId: "hackugnp",
  storageBucket: "hackugnp.firebasestorage.app",
  messagingSenderId: "491096631657",
  appId: "1:491096631657:web:020f1284e03a4fc96c75f8",
  measurementId: "G-KRJM56CWYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);