// src/firebase/add/addUserToGroup.ts
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export async function addUserToGroup(groupId: string, userId: string) {
  if (!groupId || !userId) return;

  try {
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, {
      members: arrayUnion(userId)
    });
    console.log('グループにユーザーを追加しました');
  } catch (error) {
    console.error('グループ追加に失敗しました:', error);
  }
}
