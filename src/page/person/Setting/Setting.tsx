
//@翼
import { useState } from "react";
import "./Setting.css";
import Header from "../../../components/Header/Header"; // Headerのパスに合わせて修正してください
import { useAtom } from 'jotai';
import { userIdAtom, displayNameAtom, groupIdAtom } from '../../../../atom/profileAtoms';

import "./Setting.css";
const Setting = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userId] = useAtom(userIdAtom);
  const [displayName] = useAtom(displayNameAtom);
  const [groupId,] = useAtom(groupIdAtom);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  return (
    <div>
      <Header title="個人情報" onMenuToggle={toggleMenu} isMenuOpen={menuOpen} />
      <div className="icon-changer-container">
        <div style={{margin: '16px', padding: '12px', background: '#f4f4f4', borderRadius: '8px'}}>
          <div><b>ユーザー名:</b> {displayName ?? '未取得'}</div>
          <div><b>User ID:</b> {userId ?? '未取得'}</div>
          <div><b>Group ID:</b> {groupId ?? '未取得'}</div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
