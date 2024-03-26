import {useParams,useNavigate,Link} from 'react-router-dom';
import "./post-details.css"
import { useEffect,useState } from 'react';
import{toast,ToastContainer} from 'react-toastify'
import AddComments from '../../components/comment/AddComments';
import CommentList from '../../components/comment/CommentList';
import swal from "sweetalert"
import UpdatePostModel from './UpdatePostModel';
import { useDispatch,useSelector } from 'react-redux';
import { deletePost, fetchSinglePost,toggleLikePost ,updatePostImage} from '../../redux/apiCalls/postApiCall';
const PostDetails = () => {
    const dispatch=useDispatch();
    const {post} = useSelector((state) => state.post)
    const {user} = useSelector((state) => state.auth) 

    const {id}=useParams();
    const[file,setFile]=useState(null);
    const[updatePost,setUpdatePost]=useState(false);

    useEffect(()=>{
        window.scrollTo(0,0)
        dispatch(fetchSinglePost(id))
    },[id])
    //update image submit handler
    const updateImageSubmitHandler =(e)=>{
           e.preventDefault();
           if(!file) return toast.warning("there is no file")
           const formData= new FormData();
           formData.append("image",file)
           dispatch(updatePostImage(formData,post?._id))
    }
    const navigate=useNavigate()
//Delete Post Hnadler
const deletePostHandler =()=>{
    swal({
        title: "Are you sure?",
        text: "Onec deleted ,you will not be able to recover this post!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((isOk)=>{
        if(isOk){
         dispatch(deletePost(post?._id))
         navigate(`/profile/${user?._id}`)
        }
      })

}
    return ( 
        <section className="post-details">
            <ToastContainer theme='colored' position='top-center'/>
            <div className="post-details-image-wrapper">
                <img src={file? URL.createObjectURL(file):post?.image.url} alt="" className="post-details-image" />
              {user?._id ===post?.user?._id &&(
                  <form onSubmit={updateImageSubmitHandler}  className="update-post-image-form">
                  <label htmlFor="file" className="update-post-label">
                      <i className="bi bi-image-fill">
                          Select New image
                      </i>
                  </label>
                  <input style={{display:'none'}} type="file" name='file' id='file' onChange={(e)=>setFile(e.target.files[0])}/>
                  <button type="submit" >upload</button>
              </form>
              )}
            </div>
            <h1 className="post-details-title">{post?.title}</h1>
            <div className="poat-details-user-info">
                <img src= {post?.user.profilephoto?.url} alt='' className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed et cupiditate suscipit, porro excepturi deleniti voluptates quisquam nam, voluptatum tenetur laudantium laboriosam voluptatem, adipisci tempore ipsum perferendis aut reiciendis corporis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed et cupiditate suscipit, porro excepturi deleniti voluptates quisquam nam, voluptatum tenetur laudantium laboriosam voluptatem, adipisci tempore ipsum perferendis aut reiciendis corporis?
            
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    {
                        user &&(
                        <i onClick={()=>dispatch(toggleLikePost(post?._id))} className=
                        {post?.likes.includes(user?._id)
                        ? "bi bi-hand-thumbs-up-fill"
                        :"bi bi-hand-thumbs-up"}></i>
                        )
                    } 
                    <small>
                        {post?.likes.length} likes
                    </small>
                </div>
            
                 {
                    user?._id === post?.user?._id && (
                        <div>
                     <i onClick={()=> setUpdatePost(true)} className="bi bi-pencil-square"></i>
                    <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
                    </div>
                    )}
                
            </div>
            {
                user?<AddComments postId={post?._id}/>:
                <p className='post-detiles-info-write'>
                    to write a comment you should login first
                </p>

            }
            <CommentList comments={post?.comments}/>
            {updatePost && <UpdatePostModel post={post} setUpdatePost={setUpdatePost}/>}
        </section>
     );
}
export default PostDetails;