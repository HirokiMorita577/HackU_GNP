/*@髙塚：待機人数更新関数*/
import database from "firebase/firebaseConfig";
import { ref, set } from "firebase/database";

// 


const q = ref(database, `groups/${roomId}/messages/${messageId}`);
await set(q, {
  text: "I'm doing great!",
  sender: "user2UID",
  timestamp: Date.now()
});
//(ここに設置して作成する)










/*@将臣 ここに對馬が書いた関数を呼び出して活用する(※将臣はこのファイル内を操作しない)*/