// MyPostsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPostsPage({ user }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/posts/my', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        alert('내 게시글을 불러오지 못했습니다.');
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch {
      alert('삭제 실패');
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.content.slice(0, 100)}...</p>
          <button onClick={() => navigate(`/board/${post.id}`)}>자세히 보기</button>
          <button onClick={() => handleDelete(post.id)} style={{ marginLeft: '10px' }}>삭제</button>
        </div>
      ))}
    </div>
  );
}

export default MyPostsPage;
