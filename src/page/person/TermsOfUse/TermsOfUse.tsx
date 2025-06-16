/*@翼(利用規約の文章は将臣から受け取ってもいいし自分で書いてもいい)*/
import React,{ useState } from 'react';
import './TermsOfUse.css';
import Header from '@/components/Header/Header';
const TermsOfUse: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <div>
      <Header title="規約" onMenuToggle={toggleMenu} isMenuOpen={menuOpen} />
      
    </div>
  );
};

export default TermsOfUse;
