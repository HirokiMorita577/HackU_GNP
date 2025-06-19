/*@将臣*/
import React, { useEffect, useState } from 'react';
import './Waiting.css';
import { useNavigate } from 'react-router-dom';
import { watchFalseUserCount } from '../../../../firebase/update/wait/watchFalseUserCount';
//import { useAtom } from 'jotai';
//import { groupIdAtom } from '../../../../atom/profileAtoms'; // roomIdを取得

const Waiting: React.FC = () => {
  const navigate = useNavigate();
  const [falseCount, setFalseCount] = useState(0);
  //const [groupId] = useAtom(groupIdAtom);
  const [groupId,] = useState<string>('apdaspgas');//←今はこちらを起動させる

  useEffect(() => {
    if (!groupId) return;

    watchFalseUserCount(groupId, (count) => {
      setFalseCount(count);
    });

    // Firebase の onValue は自動で unsubscribe を返さないため cleanup は空でOK
    return () => {};
  }, [groupId]);

  return (
    <div className="center-container">
      <h2 className="waiting-title">待機画面</h2>

      {/* false の人数を表示 */}
      <div className="waiting-info">{falseCount} 人待ち</div>

      {/* スタート画面へ */}
      <button className="center-button" onClick={() => navigate("/group/start")}>
        閉じる
      </button>
    </div>
  );
};

export default Waiting;
