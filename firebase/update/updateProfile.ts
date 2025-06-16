// Firebase Realtime Database に位置情報をアップロードする関数
import { ref, set } from "firebase/database";
import database from "../firebaseConfig.js";

export async function updateProfile(userId: string, profileurl: string,userName:string) {
  const locRef = ref(database, `users/${userId}/data/`);
  await set(locRef, {
    profileurl: profileurl,
    userName: userName,
  });
}
