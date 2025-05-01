import React from 'react';
import Feed from './Feed';

const Home = ({ post }) => {
  return (
    <div className='Home'>
    <main >
      
     <Feed
        post={post}
     />
    </main>
    </div>
  );
};

export default Home;
