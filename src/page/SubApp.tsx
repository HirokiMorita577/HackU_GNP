//@翼
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonOrGroup from './personOrGroup/personOrGroup';
import TermsOfUse from './person/TermsOfUse/TermsOfUse';
import Setting from './person/Setting/Setting';
import Record from './person/Record/Record';
import Map from './group/Map/Map';
import Start from './group/Start/Start';
import Waiting from './group/Waiting/Waiting';

const App: React.FC = () => {
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
          <Route path="/group/start" element={<Start />} />
          <Route path="/group/waiting" element={<Waiting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
