import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome, {user ? user.username : '익명 사용자'}</h2>

      <button onClick={() => navigate('/write')}>게시글 작성</button>
      <button onClick={() => navigate('/board')}>게시판 이동</button>
      <button onClick={() => navigate('/my-posts')}>작성한 글 확인</button>

      {user ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}
    </div>
  );
}

export default MainPage;
