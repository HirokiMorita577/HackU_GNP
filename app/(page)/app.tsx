import { useState } from "react";
import "./App.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="container">
      {/* 左上メニュー */}
      <div className="menu">
        <button className="menu-button" onClick={toggleMenu}>
          設定
        </button>
        {menuOpen && (
          <div className="menu-items">
            <button className="menu-button">記録</button>
            <button className="menu-button">規約</button>
          </div>
        )}
      </div>

      {/* 右上の文字 */}
      <div className="top-right-text">設定</div>
    </div>
  );
};

export default App;
