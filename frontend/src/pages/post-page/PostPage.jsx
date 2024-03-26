import "./posts-page.css"
import PostList from "../../components/post/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import {useDispatch,useSelector} from "react-redux";
import {fetchPosts, getPostsCount} from "../../redux/apiCalls/postApiCall"
import { useEffect, useState } from "react";

const POST_PER_PAGE=3;

const PostPage = () =>{
  const dispatch=useDispatch();
  const {postsCount,posts}=useSelector(state => state.post )
  const [currentPage, setCurrentPage]=useState(1);
  const pages=Math.ceil(postsCount/POST_PER_PAGE)
    useEffect(()=>{
      dispatch(fetchPosts(currentPage))
      window.scrollTo(0,0);
    },[currentPage])
    
    useEffect(()=>{
      dispatch(getPostsCount())
    },[currentPage])

    return(
        <>
        <section className="posts-page">
         <PostList posts={posts}/>
         <Sidebar />
        </section>
        <Pagination pages={pages} currentPage={currentPage}  setCurrentPage={setCurrentPage}/>
        </>
        );
 }
 export default PostPage;