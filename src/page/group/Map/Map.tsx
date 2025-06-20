// src/pages/Map.tsx
import React, { useEffect, useState } from 'react';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import MapView from '../../../components/Map';
import { updateUserStatusToTrue } from '../../../../firebase/update/wait/updateUserStatusToTrue';
import { saveUserTravelTime } from '../../../../firebase/update/moveTime/saveUserTime'; // ✅ 修正: 相対パス注意
import { useAtom } from 'jotai';
import { groupIdAtom, userIdAtom } from '../../../../atom/profileAtoms'; // ✅ 修
import { getGroupLocations } from '../../../../firebase/get/getGroupLocation';
import type { GroupUserLocation } from '../../../../firebase/get/getGroupLocation';

const Map: React.FC = () => {
  const navigate = useNavigate();

  const [roomId] = useAtom(groupIdAtom); // ← 実際はこちら
  const [userId] = useAtom(userIdAtom);  // ← 実際はこちら

  const [startTime, setStartTime] = useState<number | null>(null); // ✅ 表示開始時間
  const [otherLocations, setOtherLocations] = useState<GroupUserLocation[]>([]);

  // ✅ ページ表示時に開始時間を記録
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  // 他の人の位置情報を取得
  useEffect(() => {
    if (!roomId) return;
    getGroupLocations(roomId).then((locations) => {
      setOtherLocations(locations.filter(l => l.userId !== userId));
    }).catch(e => {
      console.error('getGroupLocations error:', e);
    });
  }, [roomId, userId]);

  const handleArrival = async () => {
    try {
      const endTime = Date.now();
      const timeTakenInSeconds = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
      if (userId === null || roomId === null) {
        console.error('ユーザーIDまたはグループIDが設定されていません。');
        return; // ユーザーIDまたはグループIDがない場合は何もしない
      }
      // ✅ 移動時間を Firestore に保存
      await saveUserTravelTime(userId, timeTakenInSeconds);
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
        <MapView others={otherLocations} />
      </div>

      <button className="center-button" onClick={handleArrival}>
        到着しました！
      </button>
    </div>
  );
};

export default Map;
