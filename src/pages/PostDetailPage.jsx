// PostDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

function PostDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const found = posts.find((p) => String(p.id) === String(id));
    if (found) {
      setPost(found);
    } else {
      alert('게시글을 찾을 수 없습니다.');
      navigate('/board');
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updated = posts.filter((p) => String(p.id) !== String(id));
    localStorage.setItem('posts', JSON.stringify(updated));
    alert('삭제되었습니다.');
    navigate('/board');
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
