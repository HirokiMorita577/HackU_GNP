//@翼
import { useState } from "react";
import "./Setting.css";
import Header from "../../../components/Header/Header";
import { useAtom } from 'jotai';
import { userIdAtom, displayNameAtom, groupIdAtom } from '../../../../atom/profileAtoms';

const Setting = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [userId] = useAtom(userIdAtom);
  const [displayName] = useAtom(displayNameAtom);
  const [groupId] = useAtom(groupIdAtom);

  // 🔽 ローカルストレージからのフォールバック（jotaiに値がない時用）
  const fallbackUserId = localStorage.getItem('userId');
  const fallbackDisplayName = localStorage.getItem('displayName');
  const fallbackGroupId = localStorage.getItem('groupId'); // 今後使うかもしれないので

  const finalUserId = userId ?? fallbackUserId ?? '未取得';
  const finalDisplayName = displayName ?? fallbackDisplayName ?? '未取得';
  const finalGroupId = groupId ?? fallbackGroupId ?? '未取得';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <Header title="個人情報" onMenuToggle={toggleMenu} isMenuOpen={menuOpen} />
      <div className="icon-changer-container">
      <div className="user-info" style={{margin: '16px', padding: '12px', background: '#f4f4f4', borderRadius: '8px'}}>
      <div><b>ユーザー名:</b> {finalDisplayName}</div>
      <div><b>User ID:</b> {finalUserId}</div>
      <div><b>Group ID:</b> {finalGroupId}</div>
     </div>
    </div>

    </div>
  );
};

export default Setting;
