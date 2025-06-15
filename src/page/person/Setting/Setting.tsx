/*@翼*/
import React from 'react';
import './Setting';
import Header from '@/components/Header/Header';
import { useAtom } from 'jotai';
import { userIdAtom, displayNameAtom, groupIdAtom } from '../../../../atom/profileAtoms';
// 表示テストby對馬
const Setting: React.FC = () => {
  const [userId] = useAtom(userIdAtom);
  const [displayName] = useAtom(displayNameAtom);
  const [groupId] = useAtom(groupIdAtom);
  return (
    <div>
      <Header title='設定'/>
      <div style={{margin: '16px', padding: '12px', background: '#f4f4f4', borderRadius: '8px'}}>
        <div><b>ユーザー名:</b> {displayName ?? '未取得'}</div>
        <div><b>User ID:</b> {userId ?? '未取得'}</div>
        <div><b>Group ID:</b> {groupId ?? '未取得'}</div>
      </div>
    </div>
  );
};

export default Setting;
