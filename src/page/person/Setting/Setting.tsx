//@翼
import { useState } from "react";
import "./Setting.css";
import Header from "../../../components/Header/Header"; // Headerのパスに合わせて修正してください

const Setting = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);


  const handleChangeIcon = () => {
    alert('アイコン変更ボタンが押されました');
  };
  return (
    <div>
      {/* ヘッダーにメニュー開閉用関数と状態を渡す */}
      <Header title="設定" onMenuToggle={toggleMenu} isMenuOpen={menuOpen} />

      {/* 他のコンテンツ */}
      <div className="container">
        <button className="change-icon-button" onClick={handleChangeIcon}>
          アイコンを変更
        </button>
      </div>
    </div>

  );
};

export default Setting;
