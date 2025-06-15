// src/components/Start.tsx
/*@将臣*/
import React from 'react';
import './Start.css';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
import Game from '@/components/Game/Game';
const Start: React.FC = () => {
  const navigate = useNavigate(); // useNavigateを呼び出してナビゲート関数を取得

  return (
    <div className="center-container">
      {/* スタート画面のテキスト */}
      <text>スタート画面</text>

      {/* ボタンをクリックするとマップ画面に遷移 */}
      <button className="center-button" onClick={()=>{navigate("/group/map")}}>
        マップ画面へ
      </button>
      <Game />
    </div>
  );
};

export default Start;
