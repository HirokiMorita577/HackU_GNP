import { ref, onValue } from "firebase/database";
import database from "../../firebaseConfig";

/**
 * 待機ルームのユーザーが全員 true になったかを監視
 * @param roomId ルームID
 * @param onAllTrue ユーザーが全員 true になった場合のコールバック
 */

export const watchAllUsersTrue = (roomId: string, onAllTrue: () => void) => {
  const usersRef = ref(database, `waitRooms/${roomId}/users`);

  // users の変更を監視
  onValue(usersRef, (snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      
      // すべてのユーザーが true か確認
      const allTrue = Object.values(users).every((status) => status === true);

      if (allTrue) {
        console.log("全ユーザーが true になりました");
        onAllTrue(); // コールバックを呼び出す（ページ遷移など）
      }
    }
  });
};
