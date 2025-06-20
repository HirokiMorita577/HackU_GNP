// src/components/PersonOrGroup.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateフックをインポート
import './personOrGroup.css';
import { useAtom } from 'jotai';
<<<<<<< HEAD
import { groupIdAtom } from '../../../atom/profileAtoms'; // 例: groupIdAtomのインポートパスを修正

const PersonOrGroup: React.FC = () => {
  const [groupId] = useAtom(groupIdAtom); // グループIDを取得
  const navigate = useNavigate(); // navigate関数を取得
=======
import { groupIdAtom, userIdAtom, displayNameAtom } from '../../../atom/profileAtoms'; // 追加

const PersonOrGroup: React.FC = () => {
  const [groupId] = useAtom(groupIdAtom);
  const [userId] = useAtom(userIdAtom);
  const [displayName] = useAtom(displayNameAtom);
  const navigate = useNavigate();
>>>>>>> 1805f8b (ログイン・認証機能を改善しました)

  const goToSetting = () => {
    navigate('/setting'); // 個人ページに遷移
  };

  const goToGroupStart = () => {
    navigate('/group/start'); // グループ開始ページに遷移
  };

  return (
    <div className="center-container">
      {/* ← 名前表示を追加 */}
      {userId && (
        <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          ようこそ、{displayName} さん！
        </div>
      )}

      {groupId && (
        <div className="group-id-display">
          グループID: {groupId}
        </div>
      )}
<<<<<<< HEAD
      {/* 個人選択ボタン */}
=======

>>>>>>> 1805f8b (ログイン・認証機能を改善しました)
      <button className="center-button" onClick={goToSetting}>
        個人
      </button>

      <button className="center-button" onClick={goToGroupStart}>
        グループ
      </button>
<<<<<<< HEAD
=======

      {!userId && (
        <button className="center-button" onClick={goToLogin}>
          認証
        </button>
      )}
>>>>>>> 1805f8b (ログイン・認証機能を改善しました)
    </div>
  );
};

export default PersonOrGroup;
