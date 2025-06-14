import { useState, useEffect } from 'react';
import { useState as useLocalState } from 'react';
import { useAtom } from 'jotai';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import liff from '@line/liff';
import MapView from './midpoint/Map';
import { userIdAtom, displayNameAtom, groupIdAtom } from '../atom/profileAtoms';
import { getCurrentLocation } from '../function/getCurrentLocation';
import { updateLocation } from '../firebase/update/updateLocation';

function App() {
  const [profile, setProfile] = useState("");
  const [count, setCount] = useState(0)
  const [showMap, setShowMap] = useLocalState(false);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [, setDisplayName] = useAtom(displayNameAtom);
  const [, setGroupId] = useAtom(groupIdAtom);

useEffect(() => {
  liff.init({ liffId: "2007570642-6BxVDbdl" })
    .then(async () => {
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      const profile = await liff.getProfile();
      setUserId(profile.userId);
      setDisplayName(profile.displayName);
      setProfile(profile.displayName); // 既存の表示用
      // groupId取得例（LIFF v2.19.0以降）
      const context = liff.getContext();
      if (context && context.type === 'group') {
        setGroupId(context.groupId);
      }
    })
    .catch((err) => {
      console.error("LIFF initialization failed", err);
    });
}, []);

useEffect(() => {
  if (!userId) return;
  const update = async () => {
    try {
      const loc = await getCurrentLocation();
      await updateLocation(userId, loc);
    } catch (e) {
      // エラー処理（必要に応じて）
    }
  };
  update();
  // 位置情報を定期的にアップロードしたい場合はintervalを使う
  // const interval = setInterval(update, 60000); // 例: 60秒ごと
  // return () => clearInterval(interval);
}, [userId]);

  return (
    <>
      {showMap ? (
        <MapView />
      ) : (
        <>
          <pre style={{textAlign: 'left', background: '#f4f4f4', padding: '16px', borderRadius: '8px', maxWidth: '600px', margin: '16px auto', fontSize: '14px'}}>
            {profile ? profile : 'プロフィール情報を取得中、またはログインしてください。'}
          </pre>
          <button style={{margin: '16px', padding: '12px 24px', fontSize: '16px'}} onClick={() => setShowMap(true)}>
            地図画面へ
          </button>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      )}
    </>
  )
}

export default App
