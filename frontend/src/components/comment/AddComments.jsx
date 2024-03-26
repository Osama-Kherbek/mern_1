import { useState } from "react";
import {toast} from "react-toastify";
import "./add-comment.css";
import { useDispatch} from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";
const AddComments = ({postId}) => {

    const dispatch=useDispatch()

       const[test,setText] = useState("");

    //form submit handler
     
    const fromSubmitHandler = (e)=>{
        e.preventDefault();
        if(test.trim() === "") return toast.error("place write something")
        dispatch(createComment( {test,postId} ))
        setText("");
    }
    return (
        <form onSubmit={fromSubmitHandler} className="Add-comment">
         <input type="text" placeholder = "Add a comment" className ="add-comment-input"  value={test} onChange={(e) => setText(e.target.value)}/>
         <button type="Submit" className="add-comment-btn">
            Comment
         </button>
        </form>
      );
}
 
export default AddComments;