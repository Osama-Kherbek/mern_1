import { useState,useEffect } from "react";
import "./create-post.css"
import {toast,ToastContainer} from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate}from "react-router-dom"
import { createPost } from "../../redux/apiCalls/postApiCall";
import {RotatingLines}from "react-loader-spinner"
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () =>{
    const dispatch=useDispatch();
    const{loading,isPostCreated} = useSelector(state => state.post)
    const{categories}=useSelector(state => state.category);


    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[category,setCategory]=useState("");    
    const[file ,setfile]=useState(null);

    //form submit Handler
    const fromSubmitHandler =(e)=>{
        e.preventDefault();
        if(title.trim()==="")return toast.error("post Title is required")
        if(category.trim()==="")return  toast.error("post category is required")
        if(description.trim()==="")return  toast.error("post description is required")
        if(!file)return  toast.error("post Image is required")

        const formData=new FormData();
        formData.append("image",file)
        formData.append("title",title)
        formData.append("category",category)
        formData.append("description",description)

        dispatch(createPost(formData))

    }
    const navigate=useNavigate()
    useEffect(()=>{
      if(isPostCreated){
        navigate("/")
      }
    },[isPostCreated,navigate])
    useEffect(()=>{
      dispatch(fetchCategories())
    })
    return(
        <section className="section create-post">
            <ToastContainer theme="colored" position="top-center"/>
            <h1 className="create-post-title">
                Create New Post 
            </h1>
            <form onSubmit={fromSubmitHandler}  className="create-post-form">
                <input type="text" placeholder="Post Title"  className="create-post-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <select value={category} onChange={(e)=>setCategory(e.target.value)}   className="create-post-input">
                    <option value="" disabled>Select A Category</option>
                    {
                      categories.map(category =>
                        <option value={category.title} key={category._id}>{category.title}</option>
                        )
                    }
               </select>
                 <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="create-post-textarea" rows="5" placeholder="Post Description"></textarea>
                 <input  onChange={(e)=>setfile(e.target.files[0])} type="file" name="file" id="file" className="create-post-upload"/>
                 <button type="submit" className="create-post-btn">
                   {loading? 
  (<RotatingLines
  visible={true}
  height="96"
  width="40"
  color="white"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />) :"Create"} 
                    </button>
            </form>
        </section>
        );
 }
 export default CreatePost;