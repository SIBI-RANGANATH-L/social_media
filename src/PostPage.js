import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const PostPage = ({post,handleDelete}) => {

  const { id } = useParams();
  const currentPost = post.find(p => (p.id).toString() === id);


  if (!currentPost) {
    return (
      <main>
        <h2>Post Not Found</h2>
        <p>
          <Link to="/">Visit Our Homepage</Link>
        </p>
      </main>
    );
  }
  return (
    <main>
      <article className="post">
        <h2>{currentPost.title}</h2>
        <p className="postDate">{currentPost.datetime}</p>
        <p className="postBody">{currentPost.body}</p>
        <button onClick={() => handleDelete(currentPost.id)}>
          Delete Post
        </button>
        <Link to={`/edit/${currentPost.id}`}>
          <button>Edit</button>
        </Link>
      </article>
    </main>
  );
}

export default PostPage