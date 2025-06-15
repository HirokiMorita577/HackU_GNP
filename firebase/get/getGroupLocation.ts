import { ref, get } from "firebase/database";
import database from "../firebaseConfig.js";

/**
 * グループ内の全ユーザーの位置情報を取得
 * @param groupId グループID
 * @returns [{ userId, location }, ...]
 */
export async function getGroupLocations(groupId: string) {
  // グループメンバー一覧を取得
  const membersRef = ref(database, `groups/${groupId}/members`);
  const membersSnap = await get(membersRef);
  if (!membersSnap.exists()) return [];
  const membersObj = membersSnap.val();
  const userIds = Object.keys(membersObj);

  // 各ユーザーの位置情報を取得
  const results = await Promise.all(userIds.map(async (userId) => {
    const locRef = ref(database, `users/${userId}/locations`);
    const locSnap = await get(locRef);
    return {
      userId,
      location: locSnap.exists() ? locSnap.val() : null
    };
  }));
  return results;
}
