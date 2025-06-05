import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AdminSignupPage from '../pages/AdminSignupPage';
import WritePage from '../pages/WritePage';
import BoardPage from '../pages/BoardPage';
import MyPostsPage from '../pages/MyPostsPage';
import PostDetailPage from '../pages/PostDetailPage';
import AdminPage from '../pages/AdminPage';

function StyledMainPage({ user, setUser }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingTop: '40px', flexWrap: 'wrap' }}>
      <button
        onClick={() => navigate('/write')}
        style={{ padding: '20px 30px', border: '1px solid #999', borderRadius: '6px', fontSize: '16px', background: '#fff' }}
      >
        게시글 작성
      </button>
      <button
        onClick={() => navigate('/board')}
        style={{ padding: '20px 30px', border: '1px solid #999', borderRadius: '6px', fontSize: '16px', background: '#fff' }}
      >
        게시판 이동
      </button>
      <button
        onClick={() => navigate('/my-posts')}
        style={{ padding: '20px 30px', border: '1px solid #999', borderRadius: '6px', fontSize: '16px', background: '#fff' }}
      >
        작성한 글 확인
      </button>
      {user?.role === 'admin' && (
        <button
          onClick={() => navigate('/admin')}
          style={{ padding: '20px 30px', border: '1px solid #999', borderRadius: '6px', fontSize: '16px', background: '#fff' }}
        >
          관리자 페이지
        </button>
      )}
    </div>
  );
}

function AppRouter({ user, setUser }) {
  const PageWrapper = ({ children }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: '#f8f8f8',
      overflowX: 'hidden'
    }}>
      <header style={{
        width: '100%',
        height: '60px',
        padding: '0 20px',
        background: '#fff',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Website</span>
        {user ? (
          <button
            onClick={() => {
              localStorage.removeItem('user');
              setUser(null);
              window.location.href = '/';
            }}
            style={{
              position: 'absolute',
              right: '50px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '6px 12px',
              fontSize: '14px',
              border: '1px solid #999',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={() => window.location.href = '/login'}
            style={{
              position: 'absolute',
              right: '50px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '6px 12px',
              fontSize: '14px',
              border: '1px solid #999',
              borderRadius: '4px',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            로그인
          </button>
        )}
      </header>
      <main style={{ flexGrow: 1, padding: '20px' }}>{children}</main>
    </div>
  );

  const withBackButton = (Component, props = {}) => (
    <PageWrapper>
      <button onClick={() => window.history.back()} style={{ marginBottom: '10px' }}>← 뒤로 가기</button>
      <Component {...props} />
    </PageWrapper>
  );

const LoginWrapper = (
  <PageWrapper>
    <LoginPage setUser={setUser} />
  </PageWrapper>
);

  const SignupWrapper = (Component) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#f8f8f8' }}>
      <header style={{ width: '100%', padding: '20px', background: '#fff', borderBottom: '1px solid #ccc', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Website
      </header>
      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ border: '1px solid #ccc', padding: '40px', borderRadius: '8px', background: '#fff', width: '300px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {Component}
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={LoginWrapper} />
        <Route path="/signup" element={SignupWrapper(<SignupPage />)} />
        <Route path="/admin-signup" element={SignupWrapper(<AdminSignupPage />)} />
        <Route path="/" element={<PageWrapper user={user} setUser={setUser}><StyledMainPage user={user} setUser={setUser} /></PageWrapper>} />
        <Route path="/write" element={withBackButton(WritePage, { user })} />
        <Route path="/board" element={withBackButton(BoardPage)} />
        <Route path="/board/:id" element={withBackButton(PostDetailPage, { user })} />
        <Route path="/my-posts" element={user ? withBackButton(MyPostsPage, { user }) : <Navigate to="/" />} />
        <Route path="/admin" element={user?.role === 'admin' ? <PageWrapper><AdminPage /></PageWrapper> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
