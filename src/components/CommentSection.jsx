// CommentSection.jsx
import React, { useEffect, useState, useCallback } from 'react';
import api from '../api'; // axios 인스턴스 import

function CommentSection({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      alert('댓글을 불러오지 못했습니다.');
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await api.post(`/posts/${postId}/comments`, {
        content: newComment,
        author: user?.username || '익명', // ✅ 익명 처리
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      alert('댓글 삭제에 실패했습니다.');
    }
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
