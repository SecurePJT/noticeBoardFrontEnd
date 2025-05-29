// BoardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // axios 인스턴스 import

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        alert('게시글을 불러오지 못했습니다.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/board/${post.id}`)}
          style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', cursor: 'pointer' }}
        >
          <h3>{post.title}</h3>
          <p>{post.content.slice(0, 100)}...</p>
          <small>작성자: {post.author}</small>
        </div>
      ))}
    </div>
  );
}

export default BoardPage;
