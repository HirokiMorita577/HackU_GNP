/*@翼*/
import React, { useEffect, useState } from 'react';
import './Record.css';
import Header from '@/components/Header/Header';
// import { useAtom } from 'jotai'; // ← 今は未使用ならコメントでもOK
// import { userIdAtom } from '../../../../atom/profileAtoms';
import { getUserTravelTime } from '../../../../firebase/update/moveTime/getUserTime';

const Record: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('user1'); // ← テスト中の userId

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const fetchTravelTime = async () => {
      try {
        console.log("実行");
        const data = await getUserTravelTime(userId);
        console.log("関数実行");
        if (data) {
          console.log("セットされます");
          setTravelTime(data.timeTaken);
          setTimestamp(data.timestamp); // ← これを追加！
        } else {
          setTravelTime(null);
          setTimestamp(null);
        }
      } catch (error) {
        console.error('移動時間の取得に失敗:', error);
      }
    };

    fetchTravelTime();
  }, [userId]);

  return (
    <div>
      <Header title="記録" onMenuToggle={toggleMenu} isMenuOpen={menuOpen} />

      <div className='record-container'>
        {travelTime !== null ? (
          <div className="record-box">
            <div className="record-time">
              {travelTime} <span className="unit">秒</span>
            </div>
            <div className="record-timestamp">
              記録日時: {timestamp || '記録なし'}
            </div>
          </div>
        ) : (
          <span className="no-data">移動時間データがありません。</span>
        )}
      </div>

    </div>
  );
};

export default Record;
