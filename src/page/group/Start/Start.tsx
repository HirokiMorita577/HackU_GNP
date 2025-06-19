
// src/components/Start.tsx
import React, { useEffect, useState } from 'react';
import './Start.css';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userIdAtom, groupIdAtom } from '../../../../atom/profileAtoms'; // ここ
import { watchAllUsersTrue } from '../../../../firebase/update/wait/watchAllUsersTrue';  // 追加
import { watchTimeValue } from '../../../../firebase/update/wait/TimeSnapshot';
import { setAllUsersToFalse  } from '../../../../firebase/update/wait/clearUsersInRoom';
import { waitEnd } from '../../../../firebase/update/wait/waitRoomService';
import { updateUserStatusToTrue } from '../../../../firebase/update/wait/updateUserStatusToTrue';  // 追加
import { watchFalseUserCount } from '../../../../firebase/update/wait/watchFalseUserCount';
//ここでuseAtomで管理しているuserIdとgroupIdを活用する感じになる。
const Start: React.FC = () => {
  const navigate = useNavigate();
  const [roomId,] = useAtom(groupIdAtom);//←実際はこちらを起動させる
  const [userId,]=useAtom(userIdAtom);//←実際はこちらを起動させる
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerExpired, setTimerExpired] = useState(false);
  if (!roomId) {
    console.error('グループIDが設定されていません。');
    return null; // グループIDがない場合は何も表示しない
  }
  if (!userId) {
    console.error('ユーザーIDが設定されていません。');
    return null; // ユーザーIDがない場合は何も表示しない
  }
  
  

  const [falseUserCount, setFalseUserCount] = useState<number>(0); // ←追加

  // タイマー監視
  useEffect(() => {
    const unsubscribe = watchTimeValue(roomId, (time) => {
      setTimeLeft(time);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerExpired(true);
    }
  }, [timeLeft]);

  // falseユーザー数を監視
  useEffect(() => {
    watchFalseUserCount(roomId, (count) => {
      setFalseUserCount(count);
    });
  }, []);

  useEffect(() => {
    const handleAllUsersTrue = () => {
      navigate('/group/map');
      setAllUsersToFalse(roomId);
      waitEnd(roomId);
    };
    watchAllUsersTrue(roomId, handleAllUsersTrue);
  }, []);

  useEffect(() => {
    if (timerExpired) {
      navigate('/group/map');
      setAllUsersToFalse(roomId);
      waitEnd(roomId);
    }
  }, [timerExpired, navigate]);

  // const handleCreateRoom = async () => {
  //   await makeWait(roomId);
  //   startCountdown(roomId);
  //   await addUsersToWaitRoomWithFalse(roomId, ['user1', 'user2', 'user3']);
  // };

  const handleOkButtonClick = async () => {
    try {
      await updateUserStatusToTrue(userId, roomId);
      console.log(`${userId} が true になりました`);
    } catch (error) {
      console.error('更新失敗', error);
    }
  };

  return (
    <div className="center-container">
      <h1>スタート画面</h1>

      {/* 残り人数表示 */}
      <div className="waiting-info">{falseUserCount} 人待ち</div>

      {/* タイマー */}
      <div className="timer-box">
        {timeLeft !== null ? (
          <h2>残り時間: {timeLeft} 秒</h2>
        ) : (
          <h2>カウントダウンを待機中...</h2>
        )}
      </div>
      <button className="center-button" onClick={handleOkButtonClick}>
        準備完了
      </button>
    </div>
  );
};


export default Start;
