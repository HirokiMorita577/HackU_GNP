import { ref, get } from "firebase/database";
import {database} from "../firebaseConfig"

export type GroupUserLocation = {
  userId: string;
  data: {
    userName: string;
    profileurl: string;
  };
  locations: {
    accuracy: number | null;
    lat: number | null;
    lng: number | null;
    timestamp?: number | null;
  };
};

/**
 * グループ内の全ユーザーの位置情報を取得
 * @param groupId グループID
 * @returns GroupUserLocation[]
 */
export async function getGroupLocations(groupId: string): Promise<GroupUserLocation[]> {
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
        userName: val.data?.userName || '',
        profileurl: val.data?.profileurl || '',
      },
      locations: {
        accuracy: val.locations?.accuracy ?? null,
        lat: val.locations?.lat ?? null,
        lng: val.locations?.lng ?? null,
        timestamp: val.locations?.timestamp ?? null,
      }
    };
  }));
  // nullを除外して返す
  const filtered = results.filter((r) => r !== null) as GroupUserLocation[];
  console.log('[getGroupLocations] filtered results:', filtered);
  return filtered;
}
