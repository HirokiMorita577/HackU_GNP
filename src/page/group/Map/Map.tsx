// src/components/CenterButtons.tsx
/*@将臣*/
import React from 'react';
import './Map.css';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
import MapView from '../../../components/Map';

const Map: React.FC = () => {
  const navigate=useNavigate()
  return (
    <div className="center-container">
      <text>マップ画面</text>
      <div style={{height: '60vh', width: '100%', margin: '16px 0'}}>
        <MapView />
      </div>
      {/* ボタンをクリックするとマップ画面に遷移 */}
      <button className="center-button" onClick={()=>{navigate("/group/waiting")}}>
        待機画面へ
      </button>
    </div>
  );
};

export default Map;
