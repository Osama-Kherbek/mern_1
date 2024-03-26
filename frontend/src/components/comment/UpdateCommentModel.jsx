import { useState } from "react";
import "./update-comment.css"
import { toast } from "react-toastify";
import { useDispatch} from "react-redux"
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModel = ({setUpdateComment,commentForUpdate }) => {
    const dispatch=useDispatch()

    const[test,setText] =useState(commentForUpdate?.test)
    
       //from Submit Handler
       const fromSubmitHandler=(e)=>{
        e.preventDefault();
        if(test.trim()==="")return toast.error("Place write something")
      
        dispatch(updateComment(commentForUpdate?._id,{test}))
        setUpdateComment(false)
       }
    

    return ( 
        <div className="update-comment">
            <form onSubmit={fromSubmitHandler} action="" className="update-post-form">
                <abbr title="close">
                    <i onClick={()=>setUpdateComment(false)} className="bi bi-x-circle-fill  update-comment-form-close"></i>
                </abbr>
                <h1 className="update-comment-title">Edit Comment</h1>
                <input type="text" className="update-comment-input" value={test} onChange={(e)=>setText(e.target.value)}/> 
            
                <button type="submit" className="update-comment-btn">Edit Comment</button>
                </form> 

            </div>
     );
    }
export default UpdateCommentModel;
    