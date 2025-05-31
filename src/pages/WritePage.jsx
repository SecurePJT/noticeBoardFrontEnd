// WritePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WritePage({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');

    const newPost = {
      id: Date.now(),
      title,
      content,
      author: user?.username || '익명', // ✅ 익명 처리
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
    alert('게시글이 등록되었습니다.');
    navigate('/board');
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
