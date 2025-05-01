import React from 'react'
import {  Link, Outlet} from "react-router-dom";

const PostLayout = () => {
  return (
    <>
        <li>  <Link to="/postpage/1">post1</Link>  </li>
        <li>   <Link to = '/postpage/newpost'>new post</Link> </li>
        <Outlet></Outlet>
    </>
  )
}

export default PostLayout