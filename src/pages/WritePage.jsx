// WritePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ axios 인스턴스 import

function WritePage({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post('/posts', {
        title,
        content,
        author: user?.username || '익명', // ✅ 익명 처리 유지
        createdAt: new Date().toISOString(),
      });
      alert('게시글이 등록되었습니다.');
      navigate('/board');
    } catch (error) {
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', height: '200px', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit} style={{ width: '100%', padding: '10px' }}>작성 완료</button>
    </div>
  );
}

export default WritePage;
