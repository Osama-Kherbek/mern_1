import PostList from "../../components/post/PostList";
import "./home.css"
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";
import {fetchPosts} from "../../redux/apiCalls/postApiCall"

const Home = () =>{
    const dispatch=useDispatch();
    const {posts}=useSelector(state => state.post)
    useEffect(()=>{
     dispatch(fetchPosts(1))
    },[])
   return(
    <section className="home">
        <div className="home-hero-header">
            <div className="home-hero-header-layout">
                <div className="home-title">Welcome Blog</div>
            </div>
        </div>
        <div className="home-latest-post">home-latest-post</div>
        <div className="home-container">
            <PostList posts={posts}/>
            <Sidebar />
        </div>
        <div className="home-sea-posts-link">
            <Link to="/posts" className="home-link">
            See All Posts
            </Link>
        </div>
    </section>
   );
}
export default Home;