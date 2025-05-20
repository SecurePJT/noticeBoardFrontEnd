// WritePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WritePage({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/posts', {
        title,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('게시글이 등록되었습니다.');
      navigate('/board');
    } catch (error) {
      alert('게시글 작성 실패');
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
