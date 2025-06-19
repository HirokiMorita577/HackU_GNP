import { ref, get } from "firebase/database";
import { database } from "../firebaseConfig";

/**
 * 指定したwaitRoomのlimitTimeを取得する
 * @param roomId ルームID
 * @returns limitTimeの値（number | null）
 */
export async function getWaitRoomLimitTime(roomId: string): Promise<number | null> {
  const roomRef = ref(database, `waitRoom/${roomId}/limitTime`);
  const snap = await get(roomRef);
  if (!snap.exists()) return null;
  const limitTime = snap.val();
  if (typeof limitTime === 'number') {
    return limitTime;
  }
  return null;
}
