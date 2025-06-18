import { ref, set } from "firebase/database";
import database from "../../realtimeDatabase";

export const makeWait = async (roomId: string): Promise<void> => {
    const roomRef = ref(database, `waitRooms/${roomId}`);
    try {
      await set(roomRef, { time: 30 });
      console.log("ルーム作成成功！");
    } catch (error) {
      console.error("ルーム作成エラー:", error);
    }
};
export const waitEnd = async (roomId: string): Promise<void> => {
    const roomRef = ref(database, `waitRooms/${roomId}`);
    try {
      await set(roomRef, { time: -1 });

    } catch (error) {
    console.error( error);
    }
};

