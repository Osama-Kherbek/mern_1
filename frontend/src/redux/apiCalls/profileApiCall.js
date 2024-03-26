import{ profileActions }from "../slices/profileSlice"
import request from "../../utills/request"
import {toast} from "react-toastify"
import {authActions}from "../slices/authSlice"
//Get user profile user
export function getUserProfile(userId){
    return async(dispatch) =>
    {
        try
        { 
            const { data } = await request.get(`/api/users/profile/${userId}`)
            dispatch(profileActions.setProfile(data))
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }

    }
}
//upload Profile Photo Didnt work
export function uploadProfilePhoto(newPhoto){
    return async(dispatch,getState) => {
    
        try
        { 
            const {data} = await request.post(`/api/users/profile/profile-photo-upload`,newPhoto,
            {
                headers:{ 
                    Authorization:"Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch(profileActions.setProfilePhoto(data.profilephoto))
            dispatch(authActions.setUserPhoto(data.profilephoto));
            toast.success(data.message)

            //modify the user in local storge with new photo
            const user=JSON.parse(localStorage.getItem("userInfo"))
            user.profilephoto = data?.profilephoto
            localStorage.setItem("userInfo",JSON.stringify(user))
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }

    }
}
//update Profile 
export function updateProfile(userId,profile){
    return async(dispatch,getState) => {
    
        try
        { 
            const {data} = await request.put(`/api/users/profile/${userId}`,profile,
            {
                headers:{ 
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileActions.updateProfile(data))
            dispatch(authActions.setUsername(data.username));

            //modify the user in local storge with username
            const user=JSON.parse(localStorage.getItem("userInfo"))
            user.username = data?.username
            localStorage.setItem("userInfo",JSON.stringify(user))
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }

    }
}

//Delete Profile (Account)
export function deleteProfile(userId){
    return async(dispatch,getState) => {
    
        try
        { 
            dispatch(profileActions.setLoadin())
            const {data} = await request.delete(`/api/users/profile/${userId}`,
            {
                headers:{ 
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileActions.setIsProfileDeleted())
            toast.success(data?.message)
            setTimeout(()=>dispatch(profileActions.claerIsProfileDeleted()),2000)            
        }
        catch(error)
        {
            toast.error(error.response.data.message);
            dispatch(profileActions.clearLoadin())
        }

    }
}

//Get User count (for admin dashbord)
export function getUsersCount(){
    return async(dispatch,getState) => {
    
        try
        { 
            const {data} = await request.get(`/api/users/count`,
            {
                headers:{ 
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileActions.setUserCount(data))           
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }

    }
}
//Get All Users Profile (for admin dashbord)
export function getAllUsersProfile(){
    return async(dispatch,getState) => {
    
        try
        { 
            const {data} = await request.get(`/api/users/profile`,
            {
                headers:{ 
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileActions.setProfiles(data))           
        }
        catch(error)
        {
            toast.error(error.response.data.message);
        }

    }
}