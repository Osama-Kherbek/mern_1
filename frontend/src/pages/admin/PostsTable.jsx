import AdminSidebar from "./AdminSidebar";
import "./Admin-tabel.css"
import { Link } from "react-router-dom";
import swal from "sweetalert";
import{useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";
import { getAllPosts,deletePost } from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {

    const dispatch=useDispatch()
    const {posts}=useSelector(state=> state.post)

    useEffect(()=>{
        dispatch(getAllPosts())
    })
    //Delete Post Hnadler
const deletePostHandler =(postId)=>{
    swal({
        title: "Are you sure?",
        text: "Onec deleted ,you will not be able to recover this post",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((isOk)=>{
        if(isOk){
           dispatch(deletePost(postId))
        }
      })
}
    return ( 

        <section className="tabel-container">
            <AdminSidebar/>
            <div className="tabel-wrapper">
                <h1 className="tabel-title">
                 Posts
                </h1>
                <table className="tabel">
                    <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Post Title</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                <tbody>
                    {posts.map((item,index) => (
                        <tr key={item}>
                            <td>{index+1}</td>
                            <td>
                                <div className="tabel-image">
                                    <img src={item.user.profilephoto?.url} alt="" className="tabel-user-image" />
                                    <span className="tabel-username">{item.user.username}</span>
                                </div>
                            </td>
                            <td>{item.title}</td>
                            <td>
                                <div className="table-button-group">
                                    <button>
                                        <Link to={`/posts/details/${item._id}`}>
                                        View Pos t
                                        </Link>
                                    </button>
                                    <button onClick={()=>deletePostHandler(item._id)}>Delete Post</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
    </section>
  );
} 

export  default PostsTable;