// BoardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        alert('게시글을 불러오지 못했습니다.');
      });
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
        </div>
      ))}
    </div>
  );
}

export default BoardPage;
