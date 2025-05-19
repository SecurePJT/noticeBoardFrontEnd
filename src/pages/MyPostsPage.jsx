// pages/MyPostsPage.jsx
import React, { useEffect, useState } from 'react';

function MyPostsPage({ user }) {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const mine = allPosts.filter((post) => post.author === user.username);
    setMyPosts(mine);
  }, [user.username]);

  return (
    <div>
      <h2>내 게시글 목록</h2>
      {myPosts.length === 0 && <p>작성한 글이 없습니다.</p>}
      {myPosts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPostsPage;