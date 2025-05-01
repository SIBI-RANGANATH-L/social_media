import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer"
import { useEffect, useState } from "react";
import { Routes,Route, useNavigate } from "react-router-dom";
import api from './Api/post';
import EditPost from "./EditPost";


function App() {

  const [post,setPost]=useState([]);
  const [search,setSearch]= useState('');
  const [searchResult,setSearchResult]=useState([]);
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('');
  const [editTitle,setEditTitle]=useState('');
  const [editBody,setEditBody]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchPost=async ()=>{
      try{
        const response = await api.get("/post");
        setPost(response.data);
      }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.headers);
          console.log(err.response.status);
        }
        else{
          console.log(err.message);
        }
      }
    }

    fetchPost();
  },[])


  useEffect(()=>{
    const filteredResult = post.filter(p => (
      ((p.title).toLowerCase()).includes(search.toLowerCase())
        || ((p.body).toLowerCase()).includes(search.toLowerCase())
    ));
    

    setSearchResult(filteredResult)
  },[search,post]);




  const handleDelete=async (id)=>{

    try{await api.delete(`/post/${id}`);}
    catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.headers);
        console.log(err.response.status);
      }
      else{
        console.log(err.message);
      }
    }  
    // const remainingPost=post.filter((p)=>p.id!==id)
    // setPost(remainingPost)
    navigate('/')
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const newPost={
      id:post.length?post[post.length-1].id+1:1,
      title:postTitle,
      datetime:new Date().toISOString(),
      body:postBody
    }
    
    try{
      await api.post("/post",newPost);
      // const allPost=[newPost,...post];
      // setPost(allPost);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    }catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.headers);
        console.log(err.response.status);
      }
      else{
        console.log(err.message);
      }
    }

  }

  const handleEdit =async (id)=>{
    const datetime=new Date().toISOString();
    const updatePost={id,title:editTitle,datetime,body:editBody};

    try{
      const response = await api.patch(`/post/${id}`,updatePost);
      const updatedPosts = post.map(p => p.id === id ? response.data : p);
      setPost(updatedPosts);
      
      setEditTitle('');
      setEditBody('')
      navigate('/');
    }catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.headers);
        console.log(err.response.status);
      }
      else{
        console.log(err.message);
      }
    }

  }

  const requiredPost=search.length?searchResult:post;
  return (
   <div className="App">

    <Header title={'Social media'}/>
    <Nav
      search={search}
      setSearch={setSearch}
    />
    {/* <Home
      post={requiredPost}
    />
    <NewPost
      handleSubmit={handleSubmit}
      postTitle={postTitle}
      setPostTitle={setPostTitle}
      postBody={postBody}
      setPostBody={setPostBody}
    />
    <PostPage/>
    <About/>
    <Missing/> */}
   

   <Routes>
        <Route path="/" element={<Home post={requiredPost} />} />
        <Route path="post/">
          <Route index element={
            <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
          }/>

          <Route path=":id" element={<PostPage post={post} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
        <Route path="/edit/:id" element={<EditPost
          post={post}
          handleEdit={handleEdit}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}

        />}
        
        />
        
        

          

      </Routes>
    <Footer/>

   </div>
  );
}

export default App;
