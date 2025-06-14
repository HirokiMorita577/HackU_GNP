import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import liff from '@line/liff';

function App() {
  const [profile, setProfile] = useState("");
  const [count, setCount] = useState(0)

useEffect(() => {
  liff.init({ liffId: "あなたのLIFF ID" })
    .then(async () => {
      console.log("LIFF初期化成功");
      if (!liff.isLoggedIn()) {
        console.log("ログインしていません。ログインします。");
        liff.login();
        return;
      }

      console.log("ログイン済み、プロフィール取得を試みます");

      const isClient = liff.isInClient();
      console.log("liff.isInClient():", isClient);

      const profile = await liff.getProfile();
      setProfile(profile.displayName);
      console.log("profile:", profile);
    })
    .catch((err) => {
      console.error("LIFF初期化失敗:", err);
    });
}, []);

  return (
    <>
      <pre style={{textAlign: 'left', background: '#f4f4f4', padding: '16px', borderRadius: '8px', maxWidth: '600px', margin: '16px auto', fontSize: '14px'}}>
        {profile ? profile : 'プロフィール情報を取得中、またはログインしてください。'}
      </pre>
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
