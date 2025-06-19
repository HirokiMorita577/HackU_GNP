import { ref, get } from "firebase/database";
import { database } from "../firebaseConfig";

/**
 * 指定したwaitRoomのcreateAtを取得する
 * @param roomId ルームID
 * @returns createAtの値（number | null）
 */
export async function getWaitRoomCreatedAt(roomId: string): Promise<Date | null> {
  console.log('[getWaitRoomCreatedAt] 呼び出し roomId:', roomId);
  const roomRef = ref(database, `waitRooms/${roomId}/createAt`);
  console.log('[getWaitRoomCreatedAt] roomRef:', roomRef.toString());
  const snap = await get(roomRef);
  console.log('[getWaitRoomCreatedAt] snap.exists():', snap.exists());
  if (!snap.exists()) {
    console.log('[getWaitRoomCreatedAt] データが存在しません');
    return null;
  }
  const timestamp = snap.val();
  console.log('[getWaitRoomCreatedAt] timestamp:', timestamp, 'typeof:', typeof timestamp);
  if (typeof timestamp === 'number' || typeof timestamp === 'string') {
    const numTimestamp = Number(timestamp);
    console.log('[getWaitRoomCreatedAt] numTimestamp:', numTimestamp);
    if (!isNaN(numTimestamp)) {
      const date = new Date(numTimestamp);
      console.log('[getWaitRoomCreatedAt] 返却date:', date);
      return date;
    } else {
      console.log('[getWaitRoomCreatedAt] timestampが数値変換できません');
    }
  } else {
    console.log('[getWaitRoomCreatedAt] timestampがnumberでもstringでもありません');
  }
  return null;
}
