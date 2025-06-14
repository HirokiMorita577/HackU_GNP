import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import liff from '@line/liff';

function App() {
  const [profile, setProfile] = useState("");
  const [count, setCount] = useState(0)

  useEffect(() => {
    liff.init({ liffId: "2007570642-6BxVDbdl"}).then(async () => {
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const userProfile = await liff.getProfile();
        console.log(userProfile.displayName);
        setProfile(userProfile.displayName);
        // プロフィール取得後にメッセージ送信
        liff.sendMessages([
          {
            type: 'text',
            text: `こんにちは、${userProfile.displayName}さん！プロフィールを取得しました。`
          }
        ]).catch((err) => {
          console.error('メッセージ送信エラー:', err);
        });
      }
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
