// PostDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';

function PostDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        alert('게시글을 불러오지 못했습니다.');
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('삭제되었습니다.');
      navigate('/board');
    } catch (error) {
      alert('삭제 실패');
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {(user?.role === 'admin' || user?.username === post.author) && (
        <button onClick={handleDelete} style={{ marginTop: '10px' }}>삭제</button>
      )}
      <CommentSection postId={id} user={user} />
    </div>
  );
}

export default PostDetailPage;
