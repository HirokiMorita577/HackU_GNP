/*@翼*/
import React,{ useState } from 'react';
import './Record.css';
import Header from '@/components/Header/Header';
const Record: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <div>
      <Header title="記録" onMenuToggle={toggleMenu} isMenuOpen={menuOpen} />
      <div className='distance'>
        歩いた距離
      </div>
      
    </div>
  );
};

export default Record;

//@森田(ヒロキ)ここで翼が適当に表示させた値をfirebaseから取得した値になるように変更を加える
//@髙塚ここで翼が適当に表示させた値を選択した画像になるように変更を加える。