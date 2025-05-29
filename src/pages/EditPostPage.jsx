// EditPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api'; // axios 인스턴스 import

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        alert('게시글을 불러오는 데 실패했습니다.');
        navigate('/board');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleEdit = async () => {
    try {
      await api.put(`/posts/${id}`, { title, content });
      alert('수정 완료되었습니다.');
      navigate(`/board/${id}`);
    } catch (error) {
      alert('수정에 실패했습니다.');
    }
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
