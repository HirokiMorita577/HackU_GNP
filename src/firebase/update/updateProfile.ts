// src/firebase/update/updateProfile.ts
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export async function updateProfile(userId: string, profileUrl: string, displayName: string) {
  if (!userId) return;

  await setDoc(doc(db, 'users', userId), {
    profileUrl,
    displayName,
    updatedAt: new Date().toISOString(),
  });
}
