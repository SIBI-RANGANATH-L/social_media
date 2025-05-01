import React from 'react'
import Post from './Post';
const Feed = ({post}) => {
  return (
    <>
        {post.length ? (
        post.map(p => (
          <Post key={p.id} post={p} />
        ))
      ) : (
        <p>No posts to display</p>
      )}
    </>
  );
}

export default Feed