import AdminSidebar from "./AdminSidebar";
import "./Admin-tabel.css"
import swal from "sweetalert";
import{useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";
import { deleteComment, fetchAllComment } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {

    const dispatch=useDispatch()
    const {comments}=useSelector(state=> state.comment)

    useEffect(()=>{
        dispatch(fetchAllComment())
    })
    //Delete Post Hnadler
const deleteCommentHandler = (commentId)=>{
    swal({
        title: "Are you sure?",
        text: "Onec deleted ,you will not be able to recover this comment",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((isOk)=>{
        if(isOk){
        dispatch(deleteComment(commentId))
        }
      })
}
    return ( 

        <section className="tabel-container">
            <AdminSidebar/>
            <div className="tabel-wrapper">
                <h1 className="tabel-title">
                 Comments
                </h1>
                <table className="tabel">
                    <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                <tbody>
                    {comments.map((item,index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>
                                <div className="tabel-image">
                                    <img src={item.user.profilephoto?.url} alt="" className="tabel-user-image" />
                                    <span className="tabel-username">{item.user.username}</span>
                                </div>
                            </td>
                            <td>{item.test}</td>
                            <td>
                                <div className="table-button-group">
                                 
                                    <button onClick={()=>deleteCommentHandler(item._id)}>Delete Comment</button>
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

export  default CommentsTable;