// AdminPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const loadedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const loadedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    setUsers(loadedUsers);
    setPosts(loadedPosts);
    setComments(loadedComments);
  }, []);

  const handleDeleteUser = (usernameToDelete) => {
    if (currentUser.username === usernameToDelete) {
      alert('자기 자신은 삭제할 수 없습니다.');
      return;
    }

    if (!window.confirm(`${usernameToDelete} 계정과 관련된 모든 게시글 및 댓글을 삭제하시겠습니까?`)) return;

    // 1. 유저 삭제
    const updatedUsers = users.filter((user) => user.username !== usernameToDelete);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    // 2. 게시글 삭제
    const updatedPosts = posts.filter((post) => post.author !== usernameToDelete);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);

    // 3. 댓글 삭제
    const updatedComments = comments.filter((comment) => comment.author !== usernameToDelete);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);

    alert('유저 및 해당 유저의 게시글/댓글이 삭제되었습니다.');
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
