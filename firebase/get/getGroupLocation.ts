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
  // グループメンバー一覧を取得
  const membersRef = ref(database, `waitRooms/${groupId}/users`);
  const membersSnap = await get(membersRef);
  if (!membersSnap.exists()) {
    return [];
  }
  const membersObj = membersSnap.val();
  const userIds = Object.keys(membersObj);

  // 各ユーザーの情報を取得
  const results = await Promise.all(userIds.map(async (userId) => {
    const locRef = ref(database, `users/${userId}`);
    const locSnap = await get(locRef);
    if (!locSnap.exists()) {
      return null;
    }
    const val = locSnap.val();
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
  return results.filter((r) => r !== null) as GroupUserLocation[];
}
