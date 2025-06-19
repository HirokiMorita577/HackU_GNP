import { ref, get } from "firebase/database";
import { database } from "../firebaseConfig";

/**
 * 指定したwaitRoomのcreateAtを取得する
 * @param roomId ルームID
 * @returns createAtの値（number | null）
 */
export async function getWaitRoomCreatedAt(roomId: string): Promise<Date | null> {
  const roomRef = ref(database, `waitRoom/${roomId}/createAt`);
  const snap = await get(roomRef);
  if (!snap.exists()) return null;
  const timestamp = snap.val();
  if (typeof timestamp === 'number' || typeof timestamp === 'string') {
    const numTimestamp = Number(timestamp);
    if (!isNaN(numTimestamp)) {
      return new Date(numTimestamp);
    }
  }
  return null;
}
