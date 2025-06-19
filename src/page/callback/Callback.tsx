// src/page/callback/Callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userIdAtom, displayNameAtom, profilePictureUrlAtom } from '../../atom/profileAtoms';
import { updateProfile } from '../../firebase/update/updateProfile';

const Callback = () => {
  const navigate = useNavigate();
  const setUserId = useSetAtom(userIdAtom);
  const setDisplayName = useSetAtom(displayNameAtom);
  const setProfilePicture = useSetAtom(profilePictureUrlAtom);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return;

    const fetchTokenAndProfile = async () => {
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

      // jotaiに反映
      setUserId(profile.userId);
      setDisplayName(profile.displayName);
      setProfilePicture(profile.pictureUrl);

      // Firestoreにも保存
      await updateProfile(profile.userId, profile.pictureUrl, profile.displayName);

      // App.tsxの通常ルートへ遷移（App内で自動的に動く）
      navigate('/');
    };

    fetchTokenAndProfile();
  }, []);

  return <div>ログイン処理中です…</div>;
};

export default Callback;
