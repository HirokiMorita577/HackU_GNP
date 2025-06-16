<<<<<<< HEAD
//@翼
import { useState } from "react";
import "./Setting.css";
import Header from "../../../components/Header/Header"; // Headerのパスに合わせて修正してください

const Setting = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);


  const handleChangeIcon = () => {
    alert('アイコン変更ボタンが押されました');
  };
  return (
    <div className="container">
      {/* ヘッダーにメニュー開閉用関数と状態を渡す */}
      <Header title="設定" onMenuToggle={toggleMenu} isMenuOpen={menuOpen} />

      {/* 他のコンテンツ */}
      <div className="top-right-text">ここにメインコンテンツ</div>
      <div className="icon-changer-container">
        <button className="change-icon-button" onClick={handleChangeIcon}>
          アイコンを変更
        </button>
=======
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
>>>>>>> main
      </div>
    </div>

  );
};

export default Setting;
