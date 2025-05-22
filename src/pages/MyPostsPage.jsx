// MyPostsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyPostsPage({ user }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const myPosts = allPosts.filter((post) => post.author === user.username);
    setPosts(myPosts);
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updatedPosts = allPosts.filter((post) => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts.filter((post) => post.author === user.username));
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
