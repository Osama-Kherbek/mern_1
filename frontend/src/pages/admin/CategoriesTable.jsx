import AdminSidebar from "./AdminSidebar";
import "./Admin-tabel.css"
import swal from "sweetalert";
import {useDispatch,useSelector}from "react-redux"
import { useEffect } from "react";
import { deleteCategories, fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
    const dispatch=useDispatch();
    const {categories}=useSelector(state => state.category);

    useEffect(()=>{
        dispatch(fetchCategories())
    })

    //Delete Category Hnadler
const deleteCategoryHandler =(categoryId)=>{
    swal({
        title: "Are you sure?",
        text: "Onec deleted ,you will not be able to recover this category",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then((isOk)=>{
        if(isOk){
        dispatch(deleteCategories(categoryId))
        }
      })
}
    return ( 

        <section className="tabel-container">
            <AdminSidebar/>
            <div className="tabel-wrapper">
                <h1 className="tabel-title">
                 Categories
                </h1>
                <table className="tabel">
                    <thead>
                    <tr>
                        <th>Count</th>
                        <th>User</th>
                        <th>Category Title</th>
                    </tr>
                    </thead>
                <tbody>
                    {categories.map((item,index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>
                               <b>{item.title}</b>
                            </td>
                            <td>
                                <div className="table-button-group">
                                    
                                    <button onClick={()=>deleteCategoryHandler(item._id)}>Delete Category</button>
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

export  default CategoriesTable;