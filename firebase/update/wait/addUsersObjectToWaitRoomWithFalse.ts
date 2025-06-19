import { ref, update } from "firebase/database";
import {database }from "../../firebaseConfig";

/**
 * 複数ユーザーを待機ルームに追加（初期状態 false）
 * @param roomId ルームID
 * @param userIds ユーザーIDのオブジェクトまたは配列（{ user1: true, user2: true } など）
 */
export const addUsersToWaitRoomWithFalse = async (
  roomId: string,
  userIds: string[] // ← user ID の配列を受け取る
): Promise<void> => {
  const updates: { [key: string]: boolean } = {};

  // 各ユーザーIDを false にして updates に詰める
  userIds.forEach((userId) => {
    updates[`waitRooms/${roomId}/users/${userId}`] = false;
  });

  try {
    await update(ref(database), updates);
    console.log("全ユーザーを false 状態で追加しました");
  } catch (error) {
    console.error("ユーザーの一括追加に失敗:", error);
    throw error;
  }
};
