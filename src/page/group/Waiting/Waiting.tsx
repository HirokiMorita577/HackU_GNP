// src/components/CenterButtons.tsx
/*@将臣*/
import React from 'react';
import './Waiting.css';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
const Waiting: React.FC = () => {
  const navigate=useNavigate()
  return (
    <div className="center-container">
      {/* 人数表示 */}
      <div className="waiting-info">○○人待ち</div>
      <text>待機画面</text>
      <button className="center-button" onClick={()=>{navigate("/group/start")}}>
        スタート画面へ
      </button>
    </div>
  );
};
export default Waiting;
