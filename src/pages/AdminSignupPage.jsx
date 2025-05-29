// AdminSignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // axios 인스턴스 import

function AdminSignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (adminCode !== 'AQW2ER5PO21') {
      alert('관리자 코드가 올바르지 않습니다.');
      return;
    }

    try {
      await api.post('/admin-signup', {
        username,
        password,
        role: 'admin',
      });
      alert('관리자 회원가입 완료! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      alert('이미 존재하는 아이디입니다.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>관리자 회원가입</h2>
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
      <input
        type="text"
        placeholder="관리자 코드 입력"
        value={adminCode}
        onChange={(e) => setAdminCode(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={handleSignup} style={{ width: '100%', padding: '10px' }}>
        관리자 회원가입
      </button>
    </div>
  );
}

export default AdminSignupPage;
