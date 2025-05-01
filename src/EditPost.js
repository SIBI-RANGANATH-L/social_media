import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = ({ post, handleEdit, editTitle, setEditTitle, editBody, setEditBody }) => {
    const {id}=useParams();
    const currPost=post.find((p)=>(p.id).toString()===id)
    
  useEffect(() => {
    if (currPost) {
      setEditTitle(currPost.title);
      setEditBody(currPost.body);
    }
  }, [currPost,setEditTitle,setEditBody]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(currPost.id);
  };

  return (
    <main className="EditPost">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} className="newPostForm">
        <label htmlFor="editTitle">Title:</label>
        <input
          id="editTitle"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <label htmlFor="editBody">Body:</label>
        <textarea
          id="editBody"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </main>
  );
};

export default EditPost;
