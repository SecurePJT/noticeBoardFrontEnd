// pages/BoardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BoardPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  return (
    <div>
      <h2>게시판</h2>
      {posts.length === 0 && <p>아직 작성된 글이 없습니다.</p>}
      {posts.map((post) => (
        <div key={post.id} onClick={() => navigate(`/board/${post.id}`)} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{post.title}</h3>
          <p>작성자: {post.author}</p>
        </div>
      ))}
    </div>
  );
}

export default BoardPage;