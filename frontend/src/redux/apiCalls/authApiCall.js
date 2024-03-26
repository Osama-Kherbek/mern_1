import{ authActions }from "../slices/authSlice"
import request from "../../utills/request"
import {toast} from "react-toastify"
//login user
export function loginUser(user){
    return async(dispatch) =>
    {
        try{ 
            const {data}= await request.post("/api/auth/login",user)
            dispatch(authActions.login(data))
            localStorage.setItem("userInfo",JSON.stringify(data))
        }
        catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}
//logout user
export function LogoutUser(){
    return(dispatch)=>{
        dispatch(authActions.logout())
        localStorage.removeItem("userInfo")
    }
}
//Register user
export function registerUser(user){
    return async(dispatch)=>
    {
        try{ 
            const {data}= await request.post("/api/auth/register",user)
            dispatch(authActions.register(data.message))
        }
        catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}

//Verify Email
export function verifyEmail(userId,token){
    return async(dispatch)=>
    {
        try{ 
         await request.get(`/api/auth/${userId}/verify/${token}`)
            dispatch(authActions.setIsEmailVerified())
        }
        catch(error){
            console.log(error)
            toast.error(error.response.data.message);
        }

    }
}


