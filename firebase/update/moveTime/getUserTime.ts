// src/firebase/firestore/getUserTime.ts
import { doc, getDoc } from 'firebase/firestore';
import {firestore} from '../../firebaseConfig';

/**
 * ユーザーごとの移動時間データを取得する関数
 * @param userId ユーザーID
 * @returns timeTaken（秒）と timestamp を含むオブジェクト、または null
 */
export const getUserTravelTime = async (
  userId: string
): Promise<{ timeTaken: number; timestamp: string } | null> => {
  if (!userId) {
    throw new Error('Invalid userId');
  }

  try {
    const userDocRef = doc(firestore, 'userTime', userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        timeTaken: data.timeTaken,
        timestamp: data.timestamp
      };
    } else {
      console.warn(`ユーザー ${userId} の移動時間データは存在しません。`);
      return null;
    }
  } catch (error) {
    console.error('移動時間の取得に失敗しました:', error);
    throw error;
  }
};
