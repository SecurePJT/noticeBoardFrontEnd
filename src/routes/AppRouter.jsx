// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import WritePage from '../pages/WritePage';
import BoardPage from '../pages/BoardPage';
import MyPostsPage from '../pages/MyPostsPage';
import PostDetailPage from '../pages/PostDetailPage';
import { useNavigate } from 'react-router-dom';

function StyledMainPage({ user, setUser }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingTop: '40px' }}>
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
    </div>
  );
}

function AppRouter({ user, setUser }) {
  const PageWrapper = ({ children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8f8f8' }}>
      <header style={{ width: '100%', padding: '20px', background: '#fff', borderBottom: '1px solid #ccc', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Website
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#f8f8f8' }}>
      <header style={{ width: '100%', padding: '20px', background: '#fff', borderBottom: '1px solid #ccc', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Website
      </header>
      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ border: '1px solid #ccc', padding: '40px', borderRadius: '8px', background: '#fff', width: '300px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
          <LoginPage setUser={setUser} />
        </div>
      </main>
    </div>
  );

  const SignupWrapper = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', background: '#f8f8f8' }}>
      <header style={{ width: '100%', padding: '20px', background: '#fff', borderBottom: '1px solid #ccc', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
        Website
      </header>
      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ border: '1px solid #ccc', padding: '40px', borderRadius: '8px', background: '#fff', width: '300px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</h2>
          <SignupPage />
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={LoginWrapper} />
        <Route path="/signup" element={SignupWrapper} />
        <Route path="/" element={user ? <PageWrapper><StyledMainPage user={user} setUser={setUser} /></PageWrapper> : <Navigate to="/login" />} />
        <Route path="/write" element={user ? withBackButton(WritePage, { user }) : <Navigate to="/login" />} />
        <Route path="/board" element={user ? withBackButton(BoardPage) : <Navigate to="/login" />} />
        <Route path="/board/:id" element={user ? withBackButton(PostDetailPage, { user }) : <Navigate to="/login" />} />
        <Route path="/my-posts" element={user ? withBackButton(MyPostsPage, { user }) : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
