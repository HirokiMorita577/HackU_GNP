// src/page/login/LineLoginButton.tsx
const LINE_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007601589&redirect_uri=http://localhost:5173/callback&state=abc123&scope=profile%20openid`;

const LineLoginButton = () => {
  const handleLogin = () => {
    window.location.href = LINE_LOGIN_URL;
  };

  return <button onClick={handleLogin}>LINEでログイン</button>;
};

export default LineLoginButton;
