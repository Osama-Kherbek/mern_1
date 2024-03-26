import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom"

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostPage from "./pages/post-page/PostPage";
import CreatePost from "./pages/create-post/CreatePost"
import AdminDashbord from "./pages/admin/AdminDashbord";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import Category from "./pages/category/Category";
import Profile from "./pages/Profile/Profile";
import UserTabel from "./pages/admin/UserTabel";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";

import {useSelector} from "react-redux";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/veryfi-email/VerifyEmail";
function App() {
  const{user} =useSelector(state => state.auth)
  return (
    <BrowserRouter>
    <ToastContainer/> 
      <Header/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
        
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail/> : <Navigate to="/"/>}/>



        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:userId/:token" element={<ResetPassword/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="posts">
        <Route index element={<PostPage/>}/>
        <Route path="create-post" element={user ? <CreatePost/> : <Navigate to="/" />}/>
        <Route path="details/:id" element = {<PostDetails/>}/>
        <Route path="categories/:category" element={<Category/>}/>
        </Route>
        <Route path="/admin-dashboard" element={user?.isAdmin?<AdminDashbord/> : <Navigate to="/"/>}/>
        <Route path="/admin-dashboard/users-tabel" element={user?.isAdmin?<UserTabel/> : <Navigate to="/"/>}/>
        <Route path="/admin-dashboard/posts-tabel" element={user?.isAdmin?<PostsTable/> : <Navigate to="/"/>}/>
        <Route path="/admin-dashboard/categories-tabel" element={user?.isAdmin?<CategoriesTable/> : <Navigate to="/"/>}/>
        <Route path="/admin-dashboard/comments-tabel" element={user?.isAdmin?<CommentsTable/> : <Navigate to="/"/>}/>
        
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
