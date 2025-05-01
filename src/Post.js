import React from 'react';
import { Link } from 'react-router-dom';
const Post = ({ post }) => {
  if (!post) {
    return <p>Post not found</p>; 
  }

  const body = post.body || ""; 

  return (
    <article className="post">
      <Link to={`post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
      </Link>
      <p className="postBody">
        {body.length <= 25 ? body : `${body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
