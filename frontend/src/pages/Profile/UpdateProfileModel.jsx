import { useState } from "react";
import "./update-profile.css"
import {useDispatch}from "react-redux"
import { updateProfile } from "../../redux/apiCalls/profileApiCall";
const UpdateProfileModel = ({setUpdateProfile,profile}) => {
    const dispatch=useDispatch();
        const[username,setUsername] = useState(profile.username)
        const[bio,setBio]=useState(profile.bio);
        const[password,setPassword ]=useState("");
        //from Submit Handler
        const fromSubmitHandler=(e)=>{
            e.preventDefault();
           const updateUser={username,bio}
           if(password.trim()!==""){
            updateUser.password=password
           }
           dispatch(updateProfile(profile?._id,updateUser))
           setUpdateProfile(false)

        }
    return (  
        <div className="update-profile">
            <form onSubmit={fromSubmitHandler} action="" className="update-profile-form">
                <abbr title="close">
                    <i onClick={()=>setUpdateProfile(false)} className="bi bi-x-circle-fill  update-profile-form-close"></i>
                </abbr>
                <h1 className="update-profile-title">Update your profile</h1>
                <input type="text" className="update-profile-input" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username"/> 
                <input type="text" className="update-profile-input" value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Bio"/> 
                <input type="text" className="update-profile-input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>               
                <button type="submit" className="update-profile-btn">Update profile</button>
                </form> 

            </div>
    );
}
 
export default UpdateProfileModel ;