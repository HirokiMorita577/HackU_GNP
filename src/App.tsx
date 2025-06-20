/*@髙塚@對馬*/
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import './App.css'
import { userIdAtom,profilePictureUrlAtom,displayNameAtom,groupIdAtom } from '../atom/profileAtoms';
import { getCurrentLocation } from '../function/getCurrentLocation';
import { updateLocation } from '../firebase/update/updateLocation';
import { updateProfile } from '../firebase/update/updateProfile';
import { setLineProfile } from '../function/setLineProfile';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PersonOrGroup from './page/personOrGroup/personOrGroup';
import TermsOfUse from './page/person/TermsOfUse/TermsOfUse';
import Setting from './page/person/Setting/Setting';
import Record from './page/person/Record/Record';
import Map from './page/group/Map/Map';
import Start from './page/group/Start/Start';
import Waiting from './page/group/Waiting/Waiting';
import { addUserToWaitRoom } from '../firebase/update/wait/addUserToWaitRoom';

const AppContent: React.FC = () => {
  setLineProfile();
  const [userId] = useAtom(userIdAtom);
  const [profileUrl] = useAtom(profilePictureUrlAtom);
  const [displayName] = useAtom(displayNameAtom);
  const [groupId, setGroupId] = useAtom(groupIdAtom);
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const groupIdParam = params.get('groupId');
    if (groupIdParam) {
      setGroupId(groupIdParam);
    }
  }, [search, setGroupId]);

  updateProfile(userId ||"none",profileUrl ||"none",displayName ||"none"); // プロフィールを更新
  if (groupId && userId) {
    addUserToWaitRoom(groupId,userId); // グループIDがある場合は位置情報を更新
  }
  useEffect(() => {
    if (!userId) return;
    const update = async () => {
      try {
        const loc = await getCurrentLocation();
        await updateLocation(userId, loc);
      } catch (e) {
        // エラー処理（必要に応じて）
      }
    };
    update();
    // 位置情報を定期的にアップロードしたい場合はintervalを使う
    const interval = setInterval(update, 10000); // 例: 10秒ごと
    return () => clearInterval(interval);
  }, [userId]);
<<<<<<< HEAD
    return (
=======
  useEffect(() => {
  if (displayName) {
    localStorage.setItem('displayName', displayName);
  }
}, [displayName]);

  return (
    <Router>
>>>>>>> 1805f8b (ログイン・認証機能を改善しました)
      <div className="App">
        <Routes>
          {/* ルートパス '/' にアクセスしたときに PersonOrGroup コンポーネントを表示 */}
          <Route path="/" element={<PersonOrGroup />} />
          {/* Terms of Use ページ */}
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          {/* Setting ページ */}
          <Route path="/setting" element={<Setting />} />
          {/* Record ページ */}
          <Route path="/record" element={<Record />} />
          {/* グループ関連ページ */}
          <Route path="/group/map" element={<Map />} />
          <Route path="/group/start" element={<Start />} />
          <Route path="/group/waiting" element={<Waiting />} />
        </Routes>
      </div>
    );
}

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
