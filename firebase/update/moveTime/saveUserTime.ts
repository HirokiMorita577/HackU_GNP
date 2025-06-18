// src/firebase/firestore/saveUserTime.ts
import { doc, setDoc } from 'firebase/firestore';
import firestore from '../../firestoreConfig';

/**
 * ユーザーごとの移動時間を Firestore に保存する関数
 * @param userId ユーザーID
 * @param timeTaken 移動にかかった時間（秒）
 */
export const saveUserTravelTime = async (userId: string, timeTaken: number): Promise<void> => {
  try {
    console.log(`ユーザー ${userId} の移動時間 ${timeTaken} 秒を保存しました。`);
    const userDocRef = doc(firestore, 'userTime', userId);
    await setDoc(userDocRef, {
      timeTaken: timeTaken,
      timestamp: new Date().toISOString() // 任意：記録時刻も追加
    });
        console.log(`成功`);
  } catch (error) {
    console.error('移動時間の保存に失敗しました:', error);
    throw error;
  }
};
