// src/firebase/update/updateLocation.ts
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export async function updateLocation(userId: string, location: { latitude: number; longitude: number }) {
  if (!userId) return;

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      location,
      locationUpdatedAt: new Date().toISOString(),
    });
    console.log('位置情報を更新しました');
  } catch (error) {
    console.error('位置情報の更新に失敗しました:', error);
  }
}
