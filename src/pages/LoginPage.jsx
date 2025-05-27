// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';


function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
      return;
    }

    localStorage.setItem('user', JSON.stringify(found));
    setUser(found);
    navigate('/');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const goToAdminSignup = () => {
    navigate('/admin-signup');
  };

  return (
  <div className="login-wrapper">
    <div className="login-card">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>로그인</button>
      <button className="signup-btn" onClick={goToSignup}>회원가입</button>
      <button className="signup-btn" onClick={goToAdminSignup}>관리자 회원가입</button>
    </div>
  </div>
);

}

export default LoginPage;