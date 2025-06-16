//@翼
import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom'; 

interface HeaderProps {
  title: string;
  onMenuToggle: () => void;   // メニュー開閉のコールバックをpropsで受け取る
  isMenuOpen: boolean;        // メニューの開閉状態をpropsで受け取る
}

const Header: React.FC<HeaderProps> = ({ title, onMenuToggle, isMenuOpen, }) => {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="header-top">
        <button className="hamburger" onClick={onMenuToggle}>☰</button>
        <h1>{title}</h1>
      </div>
      {isMenuOpen && (
        <nav className="menu">
          <button onClick={() => navigate('/setting')}>設定</button>
          <button onClick={() => navigate('/record')}>記録</button>
          <button onClick={() => navigate('/terms-of-use')}>規約</button>
        </nav>
      )}
     
    </header>
  );
};


export default Header;
