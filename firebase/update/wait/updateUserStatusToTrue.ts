import { ref, update } from "firebase/database";
import database from "../../firebaseConfig";

// ユーザーの状態を更新する関数
export const updateUserStatusToTrue = async (userId: string, roomId: string): Promise<void> => {
  const userRef = ref(database, `waitRooms/${roomId}/users`);

  try {
    // userIdをキーとして、その状態をtrueに更新
    await update(userRef, { [userId]: true });  // { userId: true } のように動的なキーを使う
    console.log(`${userId} が true になりました`);
  } catch (error) {
    console.error(`ユーザー ${userId} の状態を true に更新できませんでした`, error);
  }
};
