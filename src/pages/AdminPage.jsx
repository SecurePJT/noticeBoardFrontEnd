// AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/posts'),
          api.get('/admin/comments'),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
        setComments(commentsRes.data);
      } catch (error) {
        alert('데이터를 불러오지 못했습니다.');
      }
    };

    fetchAll();
  }, []);

  const handleDeleteUser = async (usernameToDelete) => {
    if (currentUser.username === usernameToDelete) {
      alert('자기 자신은 삭제할 수 없습니다.');
      return;
    }

    if (!window.confirm(`${usernameToDelete} 계정과 관련된 모든 게시글 및 댓글을 삭제하시겠습니까?`)) return;

    try {
      await api.delete(`/admin/users/${usernameToDelete}`);
      setUsers((prev) => prev.filter((user) => user.username !== usernameToDelete));
      setPosts((prev) => prev.filter((post) => post.author !== usernameToDelete));
      setComments((prev) => prev.filter((comment) => comment.author !== usernameToDelete));
      alert('유저 및 해당 유저의 게시글/댓글이 삭제되었습니다.');
    } catch (error) {
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        ← 뒤로 가기
      </button>

      <h2>📊 관리자 대시보드</h2>

      <section style={{ marginTop: '30px' }}>
        <h3>👤 유저 목록 ({users.length}명)</h3>
        <ul>
          {users.map((user, idx) => (
            <li key={idx}>
              {user.username} ({user.role})
              {user.username !== currentUser.username && (
                <button
                  onClick={() => handleDeleteUser(user.username)}
                  style={{ marginLeft: '10px', padding: '4px 8px', fontSize: '12px' }}
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h3>📝 게시글 목록 ({posts.length}개)</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title} - {post.author}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h3>💬 댓글 목록 ({comments.length}개)</h3>
        <ul>
          {comments.map((c) => (
            <li key={c.id}>{c.content} - {c.author}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminPage;
