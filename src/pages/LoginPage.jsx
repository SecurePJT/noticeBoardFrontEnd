// pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u) => u.username === username && u.password === password);

    if (!found) {
      alert('아이디 또는 비밀번호가 틀렸습니다.');
      return;
    }

    localStorage.setItem('user', JSON.stringify(found));
    setUser(found);
    navigate('/'); // ✅ 로그인 성공 시 메인페이지로 이동
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find((u) => u.username === username);

    if (exists) {
      alert('이미 존재하는 사용자입니다.');
      return;
    }

    const newUser = { username, password, role: 'user' };
    const updated = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updated));
    alert('회원가입 완료! 이제 로그인하세요.');
  };

  return (
    <div>
      <h2>Login / Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default LoginPage;