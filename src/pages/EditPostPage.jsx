import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function EditPostPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEdit = () => {
    console.log('수정 완료:', { id, title, content });
    // TODO: API 연동
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <input
        type="text"
        placeholder="제목 수정"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용 수정"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleEdit}>수정 완료</button>
    </div>
  );
}

export default EditPostPage;