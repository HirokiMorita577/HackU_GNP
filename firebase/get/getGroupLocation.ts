import { ref, get } from "firebase/database";
import {database} from "../firebaseConfig"

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
  groupId = "C14285ea1da5c907c64ef8e9d933a36be";
  console.log('[getGroupLocations] groupId:', groupId);
  // グループメンバー一覧を取得
  const membersRef = ref(database, `waitRooms/${groupId}/users`);
  console.log('[getGroupLocations] membersRef:', membersRef.toString());
  const membersSnap = await get(membersRef);
  console.log('[getGroupLocations] membersSnap.exists():', membersSnap.exists());
  if (!membersSnap.exists()) {
    console.log('[getGroupLocations] メンバーが存在しません');
    return [];
  }
  const membersObj = membersSnap.val();
  console.log('[getGroupLocations] membersObj:', membersObj);
  const userIds = Object.keys(membersObj);
  console.log('[getGroupLocations] userIds:', userIds);

  // 各ユーザーの情報を取得
  const results = await Promise.all(userIds.map(async (userId) => {
    console.log(`[getGroupLocations] userId:`, userId);
    const locRef = ref(database, `users/${userId}`);
    console.log(`[getGroupLocations] locRef for ${userId}:`, locRef.toString());
    const locSnap = await get(locRef);
    console.log(`[getGroupLocations] locSnap.exists() for ${userId}:`, locSnap.exists());
    if (!locSnap.exists()) {
      console.log(`[getGroupLocations] ユーザー${userId}のデータが存在しません`);
      return null;
    }
    const val = locSnap.val();
    console.log(`[getGroupLocations] val for ${userId}:`, val);
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
  const filtered = results.filter((r): r is GroupUserLocation => r !== null);
  console.log('[getGroupLocations] filtered results:', filtered);
  return filtered;
}
