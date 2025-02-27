import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { useState } from "react";
import { LogoutUser } from "../../redux/apiCalls/authApiCall";

 
const HeaderRight =()=>{
  const dispatch=useDispatch();
    const{user}=useSelector(state =>state.auth);

    const[dropdown,setDropdown]=useState(false);
    //logout Handler
    const logoutHandler =()=>{
      setDropdown(false);
      dispatch(LogoutUser())
    }
    return(
        <div className="header-right">
         {user?
         <>
         <div className="header-right-user-info">
          <span onClick={()=>setDropdown(prev => !prev)} className="header-rigth-username">
            {user?.username}
          </span>
        
        <img src={user?.profilePhoto.url} alt="user photo" className="header-right-user-photo"/>



        {dropdown && (  <div className="header-right-dropdown">
            <Link to={`/profile/${user?._id}`} className="header-dropdown-item" onClick={()=>setDropdown(false)}>
            <i className="bi bi-file-pers"></i>
            <span>Profile</span>
    </Link>
    <div onClick={logoutHandler} className="header-dropdown-item">
      <i className="bi bi-box-arrow-in-left"></i>
      <span>Logout</span>
    </div>

          </div>)}
         </div>
         </>:(
          <>
               <Link to="/login" className="header-right-link">
         <i className="bi bi-box-arrow-in-right"></i>
         <span>Login</span>
        </Link>
        <Link to="/register" className="header-right-link">
         <i className="bi bi-person-plus"></i>
         <span>Register</span>
        </Link></>
         )
         }
      </div> 
     )

} 
export default HeaderRight;