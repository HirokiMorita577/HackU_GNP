// src/pages/Map.tsx
import React, { useEffect, useState } from 'react';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import MapView from '../../../components/Map';
import { updateUserStatusToTrue } from '../../../../firebase/update/wait/updateUserStatusToTrue';
import { useAtom } from 'jotai';
import { userIdAtom, groupIdAtom } from '../../../../atom/profileAtoms';
import { saveUserTravelTime } from '../../../../firebase/update/moveTime/saveUserTime'; // ✅ 修正: 相対パス注意

const Map: React.FC = () => {
  const navigate = useNavigate();

  //const [roomId] = useAtom(groupIdAtom); // ← 実際はこちら
  //const [userId] = useAtom(userIdAtom);  // ← 実際はこちら
  const [roomId,] = useState<string>('apdaspgas'); // ← テスト用
  const [userId,] = useState<string>('user1');     // ← テスト用

  const [startTime, setStartTime] = useState<number | null>(null); // ✅ 表示開始時間

  // ✅ ページ表示時に開始時間を記録
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleArrival = async () => {
    try {
      //const endTime = Date.now();
     // const timeTakenInSeconds = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
      // ✅ 移動時間を Firestore に保存
      await saveUserTravelTime('user1', 100);
      // ✅ 状態を true に
      await updateUserStatusToTrue(userId, roomId);
      
      navigate("/group/waiting"); // ✅ 次の画面へ遷移
    } catch (error) {
      console.error('到着処理失敗:', error);
    }
  };

  return (
    <div className="center-container">
      <h1>マップ画面</h1>

      <div className="map-wrapper">
        <MapView />
      </div>

      <button className="center-button" onClick={handleArrival}>
        到着しました！
      </button>
    </div>
  );
};

export default Map;
