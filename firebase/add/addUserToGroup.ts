// Firebase Realtime Database にユーザーをグループに追加する関数
import { ref, get, set } from "firebase/database";
import database from "../firebaseConfig.js";

/**
 * グループにユーザーを追加
 * @param groupId グループID
 * @param userId ユーザーID
 * @param userData 任意のユーザーデータ（例: displayName, profileImgUrl など）
 */
export async function addUserToGroup(groupId: string, userId: string) {
  const joiningRef = ref(database, `groups/${groupId}/joiningMembers`);
  // 既存のリストを取得
  const snapshot = await get(joiningRef);
  let currentList: string[] = [];
  if (snapshot.exists()) {
    currentList = snapshot.val();
    if (!Array.isArray(currentList)) currentList = [];
  }
  // 重複を避けて追加
  if (!currentList.includes(userId)) {
    currentList.push(userId);
    await set(joiningRef, currentList);
}
}

