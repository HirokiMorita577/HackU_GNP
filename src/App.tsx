import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import liff from '@line/liff';

function App() {
  const [profile, setProfile] = useState(null);
  const [count, setCount] = useState(0)

  useEffect(() => {
    liff.init({ liffId: import.meta.env.VITE_LIFF_ID }).then(async () => {
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const userProfile = await liff.getProfile();
        console.log(userProfile);
        setProfile(userProfile);
      }
    });
  }, []);

  return (
    <>
      {profile ? (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '24px', maxWidth: '320px', margin: '32px auto', textAlign: 'center', background: '#fafafa' }}>
          <img
            src={profile.pictureUrl}
            alt="プロフィール画像"
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '16px' }}
          />
          <h2>{profile.displayName}</h2>
          <p>{profile.statusMessage}</p>
        </div>
      ) : (
        <p>プロフィール情報を取得中、またはログインしてください。</p>
      )}
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
  )
}

export default App
