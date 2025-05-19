// pages/PostDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const found = posts.find((p) => p.id.toString() === id);
    setPost(found);
    if (found) {
      setTitle(found.title);
      setContent(found.content);
    }

    const user = localStorage.getItem('user');
    if (user) setCurrentUser(JSON.parse(user));

    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const filtered = allComments.filter((c) => c.postId.toString() === id);
    setComments(filtered);
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updated = posts.filter((p) => p.id.toString() !== id);
    localStorage.setItem('posts', JSON.stringify(updated));
    navigate('/board');
  };

  const handleEdit = () => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const updated = posts.map((p) => {
      if (p.id.toString() === id) {
        return { ...p, title, content };
      }
      return p;
    });
    localStorage.setItem('posts', JSON.stringify(updated));
    alert('수정 완료!');
    navigate(`/board/${id}`);
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      postId: post.id,
      author: currentUser.username,
      content: newComment,
    };

    const existing = JSON.parse(localStorage.getItem('comments') || '[]');
    const updated = [...existing, comment];
    localStorage.setItem('comments', JSON.stringify(updated));
    setComments(updated.filter((c) => c.postId === post.id));
    setNewComment('');
  };

  const handleCommentDelete = (commentId) => {
    const confirm = window.confirm('댓글을 삭제할까요?');
    if (!confirm) return;

    const all = JSON.parse(localStorage.getItem('comments') || '[]');
    const filtered = all.filter((c) => c.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(filtered));
    setComments(filtered.filter((c) => c.postId === post.id));
  };

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const canEdit = currentUser && (currentUser.username === post.author || currentUser.role === 'admin');

  return (
    <div>
      {canEdit ? (
        <div>
          <h2>게시글 수정</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button onClick={handleEdit}>수정 완료</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px' }}>삭제</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p><strong>작성자:</strong> {post.author}</p>
          <p>{post.content}</p>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>댓글</h3>
        {comments.map((c) => (
          <div key={c.id} style={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
            <p><strong>{c.author}</strong>: {c.content}</p>
            {(currentUser?.username === c.author || currentUser?.role === 'admin') && (
              <button onClick={() => handleCommentDelete(c.id)} style={{ color: 'red', fontSize: '12px' }}>삭제</button>
            )}
          </div>
        ))}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글 작성..."
        />
        <br />
        <button onClick={handleCommentSubmit}>댓글 등록</button>
      </div>
    </div>
  );
}

export default PostDetailPage;
