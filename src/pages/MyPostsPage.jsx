// MyPostsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Axios 인스턴스 import

function MyPostsPage({ user }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await api.get(`/posts?author=${user.username}`);
        setPosts(response.data);
      } catch (error) {
        alert('내 게시글을 불러오지 못했습니다.');
      }
    };

    fetchMyPosts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      alert('삭제에 실패했습니다.');
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
