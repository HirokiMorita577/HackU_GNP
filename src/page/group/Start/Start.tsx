// src/components/Start.tsx
import React, { useEffect, useState } from 'react';
import './Start.css';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userIdAtom, groupIdAtom } from '../../../../atom/profileAtoms'; // ここ
import { watchAllUsersTrue } from '../../../../firebase/update/wait/watchAllUsersTrue';  // 追加
import { setAllUsersToFalse  } from '../../../../firebase/update/wait/clearUsersInRoom';
import { waitEnd } from '../../../../firebase/update/wait/waitRoomService';
import { updateUserStatusToTrue } from '../../../../firebase/update/wait/updateUserStatusToTrue';  // 追加
import { watchFalseUserCount } from '../../../../firebase/update/wait/watchFalseUserCount';
import { getWaitRoomCreatedAt } from 'firebase/get/getWaitRoomCreatedAt';
import { getWaitRoomLimitTime } from 'firebase/get/getWaitRoomLimitTime';

//ここでuseAtomで管理しているuserIdとgroupIdを活用する感じになる。
const Start: React.FC = () => {
  const navigate = useNavigate();
  const [roomId,] = useAtom(groupIdAtom);//←実際はこちらを起動させる
  const [userId,]=useAtom(userIdAtom);//←実際はこちらを起動させる
  const [timerExpired] = useState(false);
  // グループ作成日時を一番最初に取得してcreateAtに代入
  const [createAt, setCreateAt] = useState<Date | null>(null);
  const [limitTime, setLimitTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!roomId) {
      console.error('グループIDが設定されていません。');
      return; // グループIDがない場合は何も表示しない
    }
    if (!userId) {
      console.error('ユーザーIDが設定されていません。');
      return; // ユーザーIDがない場合は何も表示しない
    }
    getWaitRoomCreatedAt(roomId!).then((createdAt) => {
      setCreateAt(createdAt);
      if (createdAt) {
        console.log(`グループの作成日時: ${createdAt}`);
      } else {
        console.log('グループの作成日時が取得できませんでした。');
      }
      
    });
  }, [roomId]);

  // limitTime取得
  useEffect(() => {
    if (!roomId) return;
    getWaitRoomLimitTime(roomId).then((time) => {
      setLimitTime(time);
    });
  }, [roomId]);

  // limitTime経過で自動遷移
  useEffect(() => {
    if (!limitTime) return;
    if (!createAt) return;
    const now = new Date();
    const msPassed = now.getTime() - createAt.getTime();
    const msLeft = limitTime * 1000 - msPassed;
    if (msLeft <= 0) {
      navigate('/group/map');
    } else {
      const timer = setTimeout(() => {
        navigate('/group/map');
      }, msLeft);
      return () => clearTimeout(timer);
    }
  }, [limitTime, createAt, navigate]);

  const [falseUserCount, setFalseUserCount] = useState<number>(0); // ←追加



  // falseユーザー数を監視
  useEffect(() => {
    watchFalseUserCount(roomId!, (count) => {
      setFalseUserCount(count);
    });
  }, [roomId]);

  useEffect(() => {
    const handleAllUsersTrue = () => {
      navigate('/group/map');
      setAllUsersToFalse(roomId!);
      waitEnd(roomId!);
    };
    watchAllUsersTrue(roomId!, handleAllUsersTrue);
  }, [roomId, navigate]);

  useEffect(() => {
    if (timerExpired) {
      navigate('/group/map');
      setAllUsersToFalse(roomId!);
      waitEnd(roomId!);
    }
  }, [timerExpired, navigate, roomId]);

  // 残り時間を計算して表示
  useEffect(() => {
    if (!limitTime || !createAt) {
      setTimeLeft(null);
      return;
    }
    const update = () => {
      const now = new Date();
      const msPassed = now.getTime() - createAt.getTime();
      const secLeft = Math.max(0, Math.ceil(limitTime - msPassed / 1000));
      setTimeLeft(secLeft);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [limitTime, createAt]);

  // const handleCreateRoom = async () => {
  //   await makeWait(roomId);
  //   startCountdown(roomId);
  //   await addUsersToWaitRoomWithFalse(roomId, ['user1', 'user2', 'user3']);
  // };

  const handleOkButtonClick = async () => {
    try {
      await updateUserStatusToTrue(userId!, roomId!);
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
