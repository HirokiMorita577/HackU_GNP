// src/components/Start.tsx
/*@将臣*/
import React,{ useEffect, useState }from 'react';
import './Start.css';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
import Game from '@/components/Game/Game';
const Start: React.FC = () => {
  const navigate = useNavigate(); // useNavigateを呼び出してナビゲート関数を取得
  const [countdown, setCountdown] = useState(30);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timer);
          navigate('/group/map');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer); // タイマーリセット
  }, [navigate]);
  return (
    <div className="center-container">
      <div>
        {/* 人数表示 */}
        <div className="waiting-info">○○人待ち</div>

        {/* タイマー */}
        <div className="timer-box">
          残り時間: {countdown}秒
        </div>

        {/* 瑛樹のミニゲーム */}
        <Game />

        {/* マニュアルマップ遷移ボタン（任意） */}
        <button className="center-button" onClick={() => navigate("/group/map")}>
          マップ画面へ
        </button>
      </div>
    </div>
  );
};

export default Start;
