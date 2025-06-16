import { ref, get } from "firebase/database";
import database from "../firebaseConfig.js";

export type GroupUserLocation = {
  userId: string;
  data: {
    name: string;
    iconUrl: string;
  };
  location: {
    accuracy: number | null;
    lat: number | null;
    lng: number | null;
  };
};

/**
 * グループ内の全ユーザーの位置情報を取得
 * @param groupId グループID
 * @returns GroupUserLocation[]
 */
export async function getGroupLocations(groupId: string): Promise<GroupUserLocation[]> {
  // グループメンバー一覧を取得
  const membersRef = ref(database, `groups/${groupId}/joiningMembers`);
  const membersSnap = await get(membersRef);
  if (!membersSnap.exists()) return [];
  const membersObj = membersSnap.val();
  const userIds = Object.keys(membersObj);

  // 各ユーザーの情報を取得
  const results = await Promise.all(userIds.map(async (userId) => {
    const locRef = ref(database, `users/${userId}`);
    const locSnap = await get(locRef);
    if (!locSnap.exists()) return null;
    const val = locSnap.val();
    return {
      userId,
      data: {
        name: val.Data?.name || '',
        iconUrl: val.Data?.iconUrl || '',
      },
      location: {
        accuracy: val.Location?.accuracy ?? null,
        lat: val.Location?.lat ?? null,
        lng: val.Location?.lng ?? null,
      }
    };
  }));
  // nullを除外して返す
  return results.filter((r): r is GroupUserLocation => r !== null);
}
