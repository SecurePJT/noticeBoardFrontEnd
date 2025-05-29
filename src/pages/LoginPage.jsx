// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import api from '../api'; // axios 인스턴스 import

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        username,
        password,
      });

      const found = response.data; // 백엔드에서 반환된 사용자 정보
      localStorage.setItem('user', JSON.stringify(found));
      setUser(found);
      navigate('/');
    } catch (error) {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
    }
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
