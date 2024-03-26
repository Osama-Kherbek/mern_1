import Postitem from "./Postitem"
import "./posts.css";
const PostList =({posts})=>{
    return(
        <div className="post-list">
            {posts.map(item=> <Postitem post={item} key={item._id}/>)}
        </div>
    )
}
export default PostList