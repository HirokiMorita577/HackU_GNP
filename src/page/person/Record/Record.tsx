/*@翼*/
import React, { useEffect, useState } from 'react';
import './Record.css';
import Header from '@/components/Header/Header';
import { useAtom } from 'jotai';
import { userIdAtom } from '../../../../atom/profileAtoms'; // ✅ ユーザーIDを取得
import { getUserTravelTime } from '../../../../firebase/update/moveTime/getUserTime'; // ✅ 移動時間取得関数

const Record: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [travelTime, setTravelTime] = useState<number | null>(null); // ✅ 表示用ステート
  const [timestamp, setTimestamp] = useState<string | null>(null);
  //const [userId,] = useAtom(userIdAtom); // ✅ 実際の userId を取得
  const [userId, setUserId] = useState<string>('user1');//←今はこちらを起動させる


  const toggleMenu = () => setMenuOpen(!menuOpen);

  // 🔄 初回ロード時にデータ取得
  useEffect(() => {
    const fetchTravelTime = async () => {
      try {
        const data = await getUserTravelTime(userId);
        if (data) {
          setTravelTime(data.timeTaken);
          setTimestamp(data.timestamp);
        } else {
          setTravelTime(null);
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

      <div className='distance'>
        {travelTime !== null ? (
          <>
            前回の移動にかかった時間: <strong>{travelTime} 秒</strong><br />
            記録時刻: <small>{timestamp}</small>
          </>
        ) : (
          <span>移動時間データがありません。</span>
        )}
      </div>
    </div>
  );
};

export default Record;
