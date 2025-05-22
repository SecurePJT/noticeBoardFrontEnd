// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: '10px', marginBottom: '8px' }}
      >
        로그인
      </button>
      <button
        onClick={goToSignup}
        style={{ width: '100%', padding: '10px', marginBottom: '8px' }}
      >
        회원가입
      </button>
      <button
        onClick={goToAdminSignup}
        style={{ width: '100%', padding: '10px' }}
      >
        관리자 회원가입
      </button>
    </div>
  );
}

export default LoginPage;
