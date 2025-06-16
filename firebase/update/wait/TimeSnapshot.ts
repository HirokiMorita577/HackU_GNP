import { ref, onValue } from "firebase/database";
import database from "../../firebaseConfig";

/**
 * time値をリアルタイムに監視し、変更があればコールバックで通知する
 * @param roomId ルームID
 * @param onTimeUpdate コールバック関数（最新のtime値を渡す）
 * @returns FirebaseのUnsubscribe関数（監視停止用）
 */
export const watchTimeValue = (
  roomId: string,
  onTimeUpdate: (time: number) => void
) => {
  const timeRef = ref(database, `waitRooms/${roomId}/time`);

  const unsubscribe = onValue(timeRef, (snapshot) => {
    const value = snapshot.val();
    if (typeof value === "number") {
      console.log("timeが更新されました:", value);
      onTimeUpdate(value);
    }
  });

  return unsubscribe; // 外から停止できる
};
