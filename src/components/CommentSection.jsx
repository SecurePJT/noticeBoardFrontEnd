import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CommentSection({ postId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = () => {
    axios.get(`/api/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch(() => {
        alert('댓글을 불러올 수 없습니다.');
      });
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/posts/${postId}/comments`, {
        content: newComment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewComment('');
      fetchComments();
    } catch {
      alert('댓글 등록 실패');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchComments();
    } catch {
      alert('댓글 삭제 실패');
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
          <p>{comment.content}</p>
          <small>{comment.author}</small>
          {(user?.role === 'admin' || user?.username === comment.author) && (
            <button onClick={() => handleDelete(comment.id)} style={{ marginLeft: '10px' }}>삭제</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
