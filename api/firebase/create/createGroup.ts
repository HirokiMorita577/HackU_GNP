// Firebase Realtime Database にグループ情報を作成し、生成したgroupIdを返す関数
import { ref, set } from "firebase/database";
import database from "../firebaseConfig.js";

/**
 * グループ情報の型
 */
export type GroupData = {
    startTime: number | null; // グループ開始時間
    limitTime: number | null;
    limitPerson: number | null; // グループの人数制限
};

/**
 * グループを新規作成（groupIdを引数で指定）
 * @param groupId グループID
 * @param groupData グループ情報（GroupData型）
 * @returns groupId
 */
export async function createGroup(groupId: string, groupData: GroupData): Promise<string> {
  try {
    const groupRef = ref(database, `groups/${groupId}`);
    await set(groupRef, {
      ...groupData,
      createdAt: Date.now(),
      groupId
    });
    console.log(`グループ作成: groupId=${groupId}, data=`, groupData);
    return groupId;
  } catch (error) {
    console.error('グループ作成エラー:', error);
    throw error;
  }
}
