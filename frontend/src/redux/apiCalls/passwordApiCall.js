import{passwordActions}from "../slices/passwordSlice";
import request from "../../utills/request";
import {toast} from "react-toastify";

//Forget Password
export function forgetPassword(email){
    return async() =>
    {
        try{ 
            const {data}= await request.post("/api/password/reset-password-link",{email});
            toast.success(data.message)
        }
        catch(error){
            toast.error(error.response.data.message);
        }

    }
}

//Get Reset Password
export function getResetPassword(userId,token){
    return async(dispatch) =>
    { 
        try{ 
             await request.get(`/api/password/reset-password/${userId}/${token}`)
        }
        catch(error){
            console.log(error)
            dispatch(passwordActions.setError())
        }

    } 
}
// Reset Password
export function resetPassword(newPassword,user){
    return async() =>
    {
        try{ 
             const {data} = await request.post(`/api/password/reset-password/${user.userId}/${user.token}`
             ,{password:newPassword}
            );
             toast.success(data.message)
        }
        catch(error){
            toast.error(error.response.data.message)
        }

    }
} 