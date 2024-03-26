import "./profile.css"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import swal from "sweetalert"
import UpdateProfileModel from "./UpdateProfileModel";
import { useDispatch ,useSelector} from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useParams,useNavigate } from "react-router-dom";
import Postitem from "../../components/post/Postitem";
import {Oval}from "react-loader-spinner";
import {LogoutUser}from "../../redux/apiCalls/authApiCall"
const Profile = () => {

    const dispatch = useDispatch();
    const {profile,loading,isProfileDeleted} =useSelector((state) => state.profile)
    const {user} =useSelector((state) => state.auth)

    const [file,setFile]=useState(null);
    const[updateProfile,setUpdateProfile]=useState(false)
     
    const {id} = useParams();
    useEffect(()=>{
        dispatch(getUserProfile(id))
        window.scrollTo(0,0)
    }, [id] )

    const navigate=useNavigate()
    useEffect(()=>{
        if(isProfileDeleted){
            navigate("/")
        }
    
    }, [navigate,isProfileDeleted] )
    //form submit handler
    const formSubmitHandler = (e)=>{
    e.preventDefault();
    if(!file) return toast.warning("ther is no file")
    const formData = new FormData();
    formData.append("image",file);
    dispatch(uploadProfilePhoto(formData));
    }
//Delete profile handler

const deleteAccountHandler =()=>{
    swal({
        title: "Are you sure?",
        text: "Onec deleted ,you will not be able to recover profile",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((isOk)=>{
        if(isOk){
         dispatch(deleteProfile(user?._id))
         dispatch(LogoutUser())
        }
      })
}
if(loading){
  
  <Oval
    visible={true}
    height="120"
    width="120"
    color="#000"
    ariaLabel="gray"
    wrapperStyle={3}
    wrapperClass="3"
    />
}
    return ( 
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img src={file ? URL.createObjectURL(file) : profile?.profilephoto.url} 
                    alt="" className="profile-image" />
                   {
                    user?._id === profile?._id &&(
                        <form onSubmit={formSubmitHandler} >
                        <abbr title="choose profile photo">
                        <label htmlFor="file" className="bi bi-camera-fill uplaod-profile-photo"></label>
                        </abbr>
                        <input type="file" name="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                        <button type="Submit" className="upload-profile-photo-btn">
                            upload
                        </button>
                    </form>
                    )
                   }
                </div>
                <h1 className="profile-username">
                    {profile?.username}
                </h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>{new Date(profile?.createdAt).toDateString()}
                    </span>
                </div>
                {
                    user?._id === profile?._id &&(
                    <button onClick={()=>setUpdateProfile(true)} className="profile-update-btn">
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile  
                  </button>)
                }
                
            </div>   
            <div className="profile-posts-list">
                <h2 className="profile-post-list-title">{profile?.username} Posts</h2>
                {
                    profile?.posts?.map(post =>
                        <Postitem key={post._id} 
                        post={post}
                        username={profile?.username}
                        userId={profile?.id}
                        />)}
            </div>
            {
                user?._id === profile?._id &&(    <button onClick={deleteAccountHandler} className="delete-account-btn">
                Delete your account
                </button>)

            }
        
            {updateProfile && (<UpdateProfileModel profile={profile} setUpdateProfile={setUpdateProfile}/>)}
        </section>
     );
}
export default Profile;