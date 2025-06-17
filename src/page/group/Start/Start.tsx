
// src/components/Start.tsx
import React, { useEffect, useState } from 'react';
import './Start.css';
import { useNavigate } from 'react-router-dom';
import Game from '@/components/Game/Game';
import { makeWait } from '../../../../firebase/update/wait/waitRoomService';
import { useAtom } from 'jotai';
import { groupIdAtom } from '../../../../atom/profileAtoms';
import { startCountdown } from '../../../../firebase/update/wait/DecreaseWaitTime';
import { addUsersToWaitRoomWithFalse } from '../../../../firebase/update/wait/addUsersObjectToWaitRoomWithFalse';
import { watchAllUsersTrue } from '../../../../firebase/update/wait/watchAllUsersTrue';  // 追加
import { watchTimeValue } from '../../../../firebase/update/wait/TimeSnapshot';
import { setAllUsersToFalse  } from '../../../../firebase/update/wait/clearUsersInRoom';
import { waitEnd } from '../../../../firebase/update/wait/waitRoomService';
import { updateUserStatusToTrue } from '../../../../firebase/update/wait/updateUserStatusToTrue';  // 追加
//ここでuseAtomで管理しているuserIdとgroupIdを活用する感じになる。
const Start: React.FC = () => {

  const navigate = useNavigate();
  const [groupId] = useAtom(groupIdAtom);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // 残り時間表示用
  const [timerExpired, setTimerExpired] = useState(false);  // 30秒経過したかのフラグ

  // ユーザーIDを管理する
  const [userId, setUserId] = useState<string>('user1');  // 初期ユーザーIDを例として設定
  const [roomId] = useState<string>('apdaspgas'); // 部屋IDの例

  // Firebaseのtime値をリアルタイムで監視
  useEffect(() => {
    const unsubscribe = watchTimeValue("apdaspgas", (time) => {
      setTimeLeft(time);
    });

    // コンポーネントがアンマウントされたら監視を止める
    return () => {
      unsubscribe();
    };
  }, []);

  // 30秒経過したら遷移
  useEffect(() => {
    if (timeLeft === 0) {
      setTimerExpired(true); // 30秒経過したらフラグを立てる
    }
  }, [timeLeft]);

  // 全員がtrueになった場合の監視
  useEffect(() => {
    const handleAllUsersTrue = () => {
      console.log("全員がtrueになった");
      navigate('/group/map'); // 遷移先のページに変更
      setAllUsersToFalse('apdaspgas');
      waitEnd('apdaspgas');
    };

    watchAllUsersTrue("apdaspgas", handleAllUsersTrue);

    return () => {
      // クリーンアップ処理（監視を止める）
    };
  }, []);

  // 30秒経過か全員がtrueになった場合に遷移
  useEffect(() => {
    if (timerExpired) {
      navigate('/group/map');  // 30秒経過したら遷移
      setAllUsersToFalse('apdaspgas');
      waitEnd('apdaspgas');
    }
  }, [timerExpired, navigate]);

  // ボタンクリックでルーム作成（Firebaseに書き込み）
  const handleCreateRoom = async () => {
    await makeWait("apdaspgas");
    startCountdown("apdaspgas"); // await 不要
    await addUsersToWaitRoomWithFalse("apdaspgas", ["user1", "user2", "user3"]);
  };

  // OKボタン押下時に自分のユーザーIDの値をtrueに更新する
  const handleOkButtonClick = async () => {
    try {
      await updateUserStatusToTrue(userId, roomId);  // updateUserStatusToTrue を呼び出し
      console.log(`${userId} が true になりました`);
    } catch (error) {
      console.error('更新失敗', error);
    }
  };

  return (
    <div className="center-container">
      <h1>スタート画面</h1>
      <div>
        {/* 人数表示 */}
        <div className="waiting-info">○○人待ち</div>

        {/* タイマー */}
        <div className="timer-box">
          残り時間:         {timeLeft !== null ? (
          <h2>残り時間: {timeLeft} 秒</h2>
        ) : (
          <h2>カウントダウンを待機中...</h2>
        )}秒
        </div>

        {/* 瑛樹のミニゲーム */}
        <Game />

        {/* マニュアルマップ遷移ボタン（任意） */}
        <button className="center-button" onClick={() => navigate("/group/map")}>
          マップ画面へ
        </button>
      </div>
      <button className="center-button" onClick={handleCreateRoom}>
        ルーム作成
      </button>

      {/* OKボタンを設置して、押すと自分のユーザーIDがtrueに更新される */}
      <button className="center-button" onClick={handleOkButtonClick}>
        自分の状態をtrueにする
      </button>



      <Game />

    </div>
  );
};

export default Start;
