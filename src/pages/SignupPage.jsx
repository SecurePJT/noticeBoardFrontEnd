// SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ axios 인스턴스 import

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post('/signup', {
        username,
        password,
        role: 'user',
      });
      alert('회원가입 완료! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      alert('이미 존재하는 아이디입니다.');
    }
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
