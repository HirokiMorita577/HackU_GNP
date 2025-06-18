// src/firebase/update/updateProfile.ts
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // 初期化済みの db を使う

export async function updateProfile(userId: string, profileUrl: string, displayName: string) {
  if (!userId) return;

  try {
    await setDoc(doc(db, 'users', userId), {
      displayName,
      profileUrl,
      updatedAt: new Date().toISOString(),
    });
    console.log('プロフィールを更新しました');
  } catch (error) {
    console.error('プロフィールの更新に失敗しました:', error);
  }
}
