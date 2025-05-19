import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WritePage({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      author: user.username,
      image,
    };

    const existing = JSON.parse(localStorage.getItem('posts') || '[]');
    const updated = [newPost, ...existing];
    localStorage.setItem('posts', JSON.stringify(updated));
    navigate('/board');
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="미리보기" style={{ width: '200px', marginTop: '10px' }} />}
      <br />
      <button onClick={handleSubmit}>저장</button>
    </div>
  );
}

export default WritePage;
