import { useState } from "react";
import{toast} from 'react-toastify'
import {useDispatch}from "react-redux"
import { createCategories } from "../../redux/apiCalls/categoryApiCall";
const AddCategoryForm = () => {
    const[title,setTitle]=useState("");
    const dispatch=useDispatch()
    //form Submit Handler
    const formSubmitHandler = (e)=>{
        e.preventDefault();
        if(title.trim() ==="")return toast.error("Category title is required");
        dispatch(createCategories({title}))
        setTitle("")
    }
    return (  
        <div className="add-category">
            <h6 className="add-category-title">Add New Category</h6>
            <form onSubmit={formSubmitHandler}  className="add-category-form">
                <div className="add-category-form-group">
                    <label htmlFor="title">
                        Category Title
                    </label>
                    <input type="text" placeholder="Enter Catgory Title " value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <button className="add-category-btn" type="Submit">Add</button>
            </form>
        </div>
    );
}
 
export default AddCategoryForm;