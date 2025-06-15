// Firebase Realtime Database に位置情報をアップロードする関数
import { ref, set } from "firebase/database";
import database from "../firebaseConfig.js";

/**
 * 位置情報をアップロード
 * @param userId ユーザーID
 * @param location { lat: number, lng: number, accuracy?: number }
 */
export async function updateLocation(userId: string, profileurl: string,userName:string) {
  const locRef = ref(database, `${userId}/data/`);
  await set(locRef, {
    profileurl: profileurl,
    userName: userName,
  });
}
