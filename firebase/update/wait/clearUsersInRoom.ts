import { ref, get, update } from "firebase/database";
import database from "../../firebaseConfig";

/**
 * ルームのユーザー情報を全てfalseに更新
 * @param roomId ルームID
 */
export const setAllUsersToFalse = async (roomId: string): Promise<void> => {
  const usersRef = ref(database, `waitRooms/${roomId}/users`);

  try {
    // users ノードの内容を取得
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const users = snapshot.val();
      
      // ユーザーの状態を false に更新するための updates オブジェクトを作成
      const updates: { [key: string]: boolean } = {};

      // 各ユーザーIDを false に設定
      Object.keys(users).forEach((userId) => {
        updates[`waitRooms/${roomId}/users/${userId}`] = false;
      });

      // Firebase に一括更新
      await update(ref(database), updates);
      console.log(`ルーム ${roomId} の全ユーザー情報を false に更新しました`);
    } else {
      console.log(`ルーム ${roomId} のユーザー情報が存在しません`);
    }
  } catch (error) {
    console.error(`ルーム ${roomId} のユーザー情報更新に失敗しました`, error);
    throw error;
  }
};
