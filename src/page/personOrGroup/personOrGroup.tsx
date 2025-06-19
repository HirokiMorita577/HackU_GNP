// src/components/PersonOrGroup.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './personOrGroup.css';
import { useAtom } from 'jotai';
import { groupIdAtom, userIdAtom } from '../../../atom/profileAtoms'; // userIdAtom を追加

const PersonOrGroup: React.FC = () => {
  const [groupId] = useAtom(groupIdAtom);
  const [userId] = useAtom(userIdAtom);
  const navigate = useNavigate();

  const goToSetting = () => {
    navigate('/setting');
  };

  const goToGroupStart = () => {
    navigate('/group/start');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="center-container">
      {groupId && (
        <div className="group-id-display">
          グループID: {groupId}
        </div>
      )}

      {/* 個人選択ボタン */}
      <button className="center-button" onClick={goToSetting}>
        個人
      </button>

      {/* グループ選択ボタン */}
      <button className="center-button" onClick={goToGroupStart}>
        グループ
      </button>

      {/* 認証（ログイン）ボタン */}
      {!userId && (
        <button className="center-button" onClick={goToLogin}>
          認証
        </button>
      )}
    </div>
  );
};

export default PersonOrGroup;
