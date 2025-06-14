// Firebase Realtime Database に位置情報をアップロードする関数
import { ref, set } from "firebase/database";
import database from "../firebaseConfig.js";

/**
 * 位置情報をアップロード
 * @param userId ユーザーID
 * @param location { lat: number, lng: number, accuracy?: number }
 */
export async function updateLocation(userId: string, location: { lat: number; lng: number; accuracy?: number }) {
  const locRef = ref(database, `locations/${userId}`);
  await set(locRef, {
    lat: location.lat,
    lng: location.lng,
    accuracy: location.accuracy ?? null,
    timestamp: Date.now()
  });
}
