import { useState } from "react"
import "./coment-list.css"
import swal from "sweetalert"
import UpdateCommentModel from "./UpdateCommentModel"
import Moment from "react-moment"; 
import { useDispatch,useSelector } from 'react-redux';
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({comments}) => {


  const dispatch=useDispatch()
  const {user} = useSelector(state => state.auth) 
 const [updateComment,setUpdateComment]=useState(false)
 const [commentForUpdate,setcommentForUpdate]=useState(null)

 //update comment Handler
 const updateCommentHandler=(comment)=>{
    setcommentForUpdate(comment)
   setUpdateComment(true)

 }
  const deleteCommentHandler =(commentId)=>{
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
        <div className="comment-list">
          <h4 className="comment-list-count">{comments?.length} Comment</h4>
          {comments?.map(comment => (
            <div key={comment._id} className="comment-item">

              <div className="comment-item-info">
              <div className="comment-item-username">
                {comment.username}
              </div>
              <div className="comment-item-time">
                <Moment fromNow ago>
               {comment.createdAt} 
               </Moment>{" "}
                ago
              </div>
              </div>
              <p className="comment-item-text">
                {comment.test}
                </p>
            {
              user?._id === comment.user &&(
                <div className="comment-item-icon-wrapper">
                  <i onClick={()=>updateCommentHandler(comment)} className="bi bi-pencil-square"></i>
                  <i onClick={()=>deleteCommentHandler(comment?._id)} className="bi bi-trash-fill"></i>
                </div>
              )
            }
            </div>
          ))} 
          {updateComment && (
          <UpdateCommentModel commentForUpdate={commentForUpdate} setUpdateComment={setUpdateComment}/>
          )
          }
        </div>
    );
}
 
export default CommentList;