import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find((u) => u.username === username);

    if (exists) {
      alert('이미 존재하는 사용자입니다.');
      return;
    }

    const newUser = { username, password, role: 'user' };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    alert('회원가입 완료! 로그인 페이지로 이동합니다.');
    navigate('/login');
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
      <button onClick={handleSignup} style={{ width: '100%', padding: '10px' }}>
        회원가입
      </button>
    </div>
  );
}

export default SignupPage;
