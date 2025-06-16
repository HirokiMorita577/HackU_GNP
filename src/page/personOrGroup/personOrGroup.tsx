// src/components/PersonOrGroup.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
import './personOrGroup.css';
import { useAtom } from 'jotai';
import { groupIdAtom } from '../../../atom/profileAtoms'; // 例: groupIdAtomのインポートパスを修正

const PersonOrGroup: React.FC = () => {
  const [groupId] = useAtom(groupIdAtom); // グループIDを取得
  const navigate = useNavigate(); // navigate関数を取得

  const goToSetting = () => {
    navigate('/setting'); // 個人ページに遷移
  };

  const goToGroupStart = () => {
    navigate('/group/start'); // グループ開始ページに遷移
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
    </div>
  );
};

export default PersonOrGroup;
