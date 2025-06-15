/*@髙塚@對馬*/
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import './App.css'
import { userIdAtom } from '../atom/profileAtoms';
import { getCurrentLocation } from '../function/getCurrentLocation';
import { updateLocation } from '../firebase/update/updateLocation';
//import { setLineProfile } from '../function/setLineProfile';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonOrGroup from './page/personOrGroup/personOrGroup';
import TermsOfUse from './page/person/TermsOfUse/TermsOfUse';
import Setting from './page/person/Setting/Setting';
import Record from './page/person/Record/Record';
import Map from './page/group/Map/Map';
import Start from './page/group/Start/Start';
import Waiting from './page/group/Waiting/Waiting';

const App: React.FC = () => {
  //ローカルテスト時は切って
  //setLineProfile(); // プロフィールをセット
  const [userId] = useAtom(userIdAtom);
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
    return (
    <Router>
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
          <Route path="/start" element={<Start />} />
          <Route path="/group/waiting" element={<Waiting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
