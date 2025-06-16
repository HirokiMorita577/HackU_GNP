// src/components/Start.tsx
/*@将臣*/
import React, { useEffect } from 'react';
import './Start.css';
import { useNavigate } from 'react-router-dom';
import Game from '@/components/Game/Game';
import { makeWait } from '../../../../firebase/update/waitRoomService';
import { useAtom } from 'jotai';
import { groupIdAtom } from '../../../../atom/profileAtoms';
const Start: React.FC = () => {
  const navigate = useNavigate();
  const [groupId,] = useAtom(groupIdAtom);


  // データ取得（初回のみ）
  useEffect(() => {
    if (!groupId) return;
  }, [groupId]);

  // ボタンクリックでルーム作成（Firebaseに書き込み）
  const handleCreateRoom = async () => {
    console.log("現在のID"+groupId)
    if (!groupId) return;
    await makeWait(groupId)//
  };

  return (
    <div className="center-container">
      <h1>スタート画面</h1>

      <button className="center-button" onClick={handleCreateRoom}>
        ルーム作成
      </button>

      <button className="center-button" onClick={() => navigate('/group/map')}>
        マップ画面へ
      </button>
      <Game />
    </div>
  );
};

export default Start;
