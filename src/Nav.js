import React from 'react'
import {Link} from 'react-router-dom'
const Nav = ({search,setSearch}) => {

  const onSearchChange=(e)=>{
    setSearch(e.target.value);
  }
  return (
    <nav className='Nav'>
  
      <form className='searchForm' onSubmit={e=>e.preventDefault()}>
          <label htmlFor='search'>Search post</label>
          <input
              id='search'
              type='text'
              placeholder='search post'
              value={search}
              onChange={onSearchChange}

          />  
          
      </form>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="post">Post</Link></li>
        <li><Link to="about">About</Link></li>
      </ul>
    
    </nav>
  )
  
}

export default Nav