// CommentSection.jsx
import React, { useEffect, useState, useCallback } from 'react';

function CommentSection({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = useCallback(() => {
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const filtered = allComments.filter((c) => String(c.postId) === String(postId));
    setComments(filtered);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const newItem = {
      id: Date.now(),
      postId,
      content: newComment,
      author: user.username,
    };
    localStorage.setItem('comments', JSON.stringify([...allComments, newItem]));
    setNewComment('');
    fetchComments();
  };

  const handleDelete = (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    const allComments = JSON.parse(localStorage.getItem('comments') || '[]');
    const filtered = allComments.filter((c) => c.id !== commentId);
    localStorage.setItem('comments', JSON.stringify(filtered));
    fetchComments();
  };

  return (
    <div>
      <h4>댓글</h4>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력하세요"
        style={{ width: '100%', height: '80px', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit} style={{ marginBottom: '20px' }}>댓글 등록</button>

      {comments.map((comment) => (
        <div key={comment.id} style={{ borderTop: '1px solid #ddd', padding: '10px 0' }}>
          <p style={{ marginBottom: '6px' }}>{comment.content}</p>
          <div style={{ fontSize: '14px', color: '#555' }}>
            작성자: <strong>{comment.author}</strong>
            {(user?.role === 'admin' || user?.username === comment.author) && (
              <button onClick={() => handleDelete(comment.id)} style={{ marginLeft: '10px' }}>삭제</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
