import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/login', {
        username,
        password,
      });

      const found = res.data; // 백엔드에서 사용자 정보 반환 가정
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
      <button onClick={handleLogin} style={{ width: '100%', padding: '10px', marginBottom: '8px' }}>로그인</button>
      <button onClick={goToSignup} style={{ width: '100%', padding: '10px' }}>회원가입</button>
    </div>
  );
}

export default LoginPage;
