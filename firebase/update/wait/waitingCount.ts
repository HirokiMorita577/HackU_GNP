import { ref, set } from "firebase/database";
import database from "../../realtimeDatabase";

/**
 * ユーザーを待機ルームのusersに追加する
 * @param roomId ルームID
 * @param userId 追加するユーザーID
 */
export const changeUserToWaitRoom = async (roomId: string, userId: string): Promise<void> => {
  const userRef = ref(database, `waitRooms/${roomId}/users/${userId}`);
  try {
    await set(userRef, true); // データは true、またはタイムスタンプなどでもOK
    console.log(`${userId} を waitRoom に追加しました`);
  } catch (error) {
    console.error("ユーザー追加に失敗:", error);
    throw error;
  }
};
