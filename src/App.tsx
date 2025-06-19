// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAtom } from 'jotai';

import './App.css';

// 状態管理
import { userIdAtom, profilePictureUrlAtom, displayNameAtom, groupIdAtom } from '../atom/profileAtoms';

// 位置情報とFirebase連携
import { getCurrentLocation } from '../function/getCurrentLocation';
import { updateLocation } from '../firebase/update/updateLocation';
import { updateProfile } from '../firebase/update/updateProfile';
import { addUserToGroup } from '../firebase/add/addUserToGroup';

// ページ群（既存）
import PersonOrGroup from './page/personOrGroup/personOrGroup';
import TermsOfUse from './page/person/TermsOfUse/TermsOfUse';
import Setting from './page/person/Setting/Setting';
import Record from './page/person/Record/Record';
import Map from './page/group/Map/Map';
import Start from './page/group/Start/Start';
import Waiting from './page/group/Waiting/Waiting';

// 追加ページ（あなたのLINEログイン）
import LineLoginButton from './page/login/LineLoginButton';
import Callback from './page/callback/Callback';

const App: React.FC = () => {
  const [userId] = useAtom(userIdAtom);
  const [profileUrl] = useAtom(profilePictureUrlAtom);
  const [displayName] = useAtom(displayNameAtom);
  const [groupId] = useAtom(groupIdAtom);

  // プロフィール更新
  useEffect(() => {
    if (!userId) return;
    updateProfile(userId, profileUrl || 'none', displayName || 'none');
  }, [userId, profileUrl, displayName]);

  // グループ追加
  useEffect(() => {
    if (groupId && userId) {
      addUserToGroup(groupId, userId);
    }
  }, [groupId, userId]);

  // 現在地を定期送信
  useEffect(() => {
    if (!userId) return;

    const update = async () => {
      try {
        const loc = await getCurrentLocation();
        await updateLocation(userId, loc);
      } catch (e) {
        console.error('位置情報更新エラー:', e);
      }
    };

    update(); // 初回呼び出し
    const interval = setInterval(update, 10000); // 10秒ごと更新

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 既存ルート */}
          <Route path="/" element={<PersonOrGroup />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/record" element={<Record />} />
          <Route path="/group/map" element={<Map />} />
          <Route path="/group/start" element={<Start />} />
          <Route path="/group/waiting" element={<Waiting />} />

          {/* あなたのLINEログインルート */}
          <Route path="/login" element={<LineLoginButton />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
