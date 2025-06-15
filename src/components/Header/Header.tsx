//@翼
import React from 'react';
import './Header.css'; // CSSスタイルのインポート

interface HeaderProps {
  title: string;
  // 他にも必要なプロパティを追加できます（例えば、ボタンなど）
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header-container">
      <h1>{title}</h1>
      {/* 他にもヘッダーに表示したい要素（ボタンやナビゲーションなど）を追加できます */}
    </header>
  );
};

export default Header;
