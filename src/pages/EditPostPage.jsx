// EditPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const found = posts.find((p) => String(p.id) === String(id));
    if (found) {
      setTitle(found.title);
      setContent(found.content);
    } else {
      alert('게시글을 불러오는 데 실패했습니다.');
      navigate('/board');
    }
  }, [id, navigate]);

  const handleEdit = () => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = posts.map((p) =>
      String(p.id) === String(id) ? { ...p, title, content } : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    alert('수정 완료되었습니다.');
    navigate(`/board/${id}`);
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <input
        type="text"
        placeholder="제목 수정"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용 수정"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleEdit}>수정 완료</button>
    </div>
  );
}

export default EditPostPage;
