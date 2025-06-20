// src/page/callback/Callback.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userIdAtom, displayNameAtom, profilePictureUrlAtom } from '../../atom/profileAtoms';
import { updateProfile } from '../../firebase/update/updateProfile';

// 必要に応じて Header を表示するためのインポート（ファイルが存在する前提）
import Header from '../../components/Header/Header';

// スタイリング（存在しない場合はコメントアウト可）
// import './Callback.css';

const Callback = () => {
  const navigate = useNavigate();
  const setUserId = useSetAtom(userIdAtom);
  const setDisplayName = useSetAtom(displayNameAtom);
  const setProfilePicture = useSetAtom(profilePictureUrlAtom);

  const [loadingMessage, setLoadingMessage] = useState('ログイン処理中です…');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      setLoadingMessage('ログインコードが取得できませんでした。');
      return;
    }

    const fetchTokenAndProfile = async () => {
      try {
        const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:5173/callback',
            client_id: '2007601589',
            client_secret: '9c7da393516ded0a8314afd5d3d9bf64',
          }),
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        const profileRes = await fetch('https://api.line.me/v2/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const profile = await profileRes.json();

        // jotai に保存
        setUserId(profile.userId);
        setDisplayName(profile.displayName);
        setProfilePicture(profile.pictureUrl);
        localStorage.setItem('userId', profile.userId);
        localStorage.setItem('displayName', profile.displayName);
        // Firestore にも保存
        await updateProfile(profile.userId, profile.pictureUrl, profile.displayName);

        // ホームへ遷移
        navigate('/');
      } catch (error) {
        console.error('ログイン中にエラーが発生しました:', error);
        setLoadingMessage('ログイン中にエラーが発生しました');
      }
    };

    fetchTokenAndProfile();
  }, []);

  return (
    <div>
      <Header title="認証中" />
      <div style={{ padding: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
        {loadingMessage}
      </div>
    </div>
  );
};

export default Callback;
