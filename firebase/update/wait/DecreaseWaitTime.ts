

import { ref, get, update } from "firebase/database";
import database from "../../realtimeDatabase";
/**
 * 1秒ごとにFirebase上のtime値を1ずつ減らす
 * @param roomId 対象のルームID（例: "apdaspgas"）
 */
export const startCountdown = (roomId: string): void => {
  const timeRef = ref(database, `waitRooms/${roomId}/time`);

  const intervalId = setInterval(async () => {
    try {
      const snapshot = await get(timeRef);
      if (!snapshot.exists()) {
        console.warn("time値が見つかりません");
        clearInterval(intervalId);
        return;
      }

      const currentTime = snapshot.val();

      if (typeof currentTime !== 'number' || currentTime < 0) {
        console.log("カウントダウン終了");
        clearInterval(intervalId);
        return;
      }

      await update(ref(database, `waitRooms/${roomId}`), {
        time: currentTime - 1
      });

      console.log("time:", currentTime - 1);
    } catch (err) {
      console.error("time更新中にエラー:", err);
      clearInterval(intervalId);
    }
  }, 1000); // 1秒ごと
};

