import { ref, onValue } from "firebase/database";
import {database} from "../../firebaseConfig"

/**
 * 待機ルームの中で false のユーザー数を監視する
 * @param roomId ルームID
 * @param onUpdateFalseCount false のユーザー数が更新されたときのコールバック
 */
export const watchFalseUserCount = (
  roomId: string,
  onUpdateFalseCount: (falseCount: number) => void
) => {
  const usersRef = ref(database, `waitRooms/${roomId}/users`);

  onValue(usersRef, (snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();

      const falseCount = Object.values(users).filter((status) => status === false).length;

      onUpdateFalseCount(falseCount);
    } else {
      onUpdateFalseCount(0); // ユーザーが存在しない場合は0
    }
  });
};
