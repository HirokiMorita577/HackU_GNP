// src/components/CenterButtons.tsx
/*@将臣*/
import React from 'react';
import './Map.css';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
const Map: React.FC = () => {
  const navigate=useNavigate()
  return (
    <div className="center-container">
      <text>マップ画面</text>

      {/* ボタンをクリックするとマップ画面に遷移 */}
      <button className="center-button" onClick={()=>{navigate("/group/waiting")}}>
        到着しました！
      </button>
    </div>
  );
};

export default Map;
