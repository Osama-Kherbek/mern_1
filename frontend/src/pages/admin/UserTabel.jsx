import AdminSidebar from "./AdminSidebar";
import "./Admin-tabel.css"
import { Link } from "react-router-dom";
import swal from "sweetalert";
import{useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";

const UserTabel = () => {

    const dispatch=useDispatch()
    const {profiles,isProfileDeleted}=useSelector(state=> state.profile)
    useEffect(()=>{
        dispatch(getAllUsersProfile())
    },[isProfileDeleted])
    //Delete User Hnadler
const deleteUserHandler =(userId)=>{
    swal({
        title: "Are you sure?",
        text: "Onec deleted ,you will not be able to recover this user",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((isOk)=>{
        if(isOk){
      dispatch(deleteProfile(userId))
        }
      })
}
    return ( 

        <section className="tabel-container">
            <AdminSidebar/>
            <div className="tabel-wrapper">
                <h1 className="tabel-title">
                 Users
                </h1>
                <table className="tabel">
                    <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                <tbody>
                    {profiles.map((item,index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>
                                <div className="tabel-image">
                                    <img src={item.profilephoto?.url} alt="" className="tabel-user-image" />
                                    <span className="tabel-username">{item.username}</span>
                                </div>
                            </td>
                            <td>{item.email}</td>
                            <td>
                                <div className="table-button-group">
                                    <button>
                                        <Link to={`/profile/${item._id}`}>
                                        View Profile
                                        </Link>
                                    </button>
                                    <button onClick={()=>deleteUserHandler(item._id)}>Delete User</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
    </section>
  );
} 

export  default UserTabel;