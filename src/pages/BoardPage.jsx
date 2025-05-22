// BoardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(stored);
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
