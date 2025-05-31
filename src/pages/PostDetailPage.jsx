// PostDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import api from '../api'; // axios 인스턴스 import

function PostDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        alert('게시글을 찾을 수 없습니다.');
        navigate('/board');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/posts/${id}`);
      alert('삭제되었습니다.');
      navigate('/board');
    } catch (error) {
      alert('삭제에 실패했습니다.');
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>작성자: {post.author}</small>
      <br />
      {(user?.role === 'admin' || user?.username === post.author) && (
        <button onClick={handleDelete} style={{ marginTop: '10px' }}>삭제</button>
      )}

      {/* ✅ 댓글 섹션 */}
      <div style={{ marginTop: '40px' }}>
        <CommentSection postId={post.id} user={user} />
      </div>
    </div>
  );
}

export default PostDetailPage;
