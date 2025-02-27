const asyncHandler=require("express-async-handler");
const {User,validateUpdateUser}=require("../model/User");
const bcrypt=require("bcryptjs");
const path=require("path");
const fs=require("fs")
const {cloudinaryRemoveImage,cloudinaryUploadImage, cloudinaryRemoveMaltiImage}=require("../util/cloudinary")
const{Comment}=require("../model/Comment")
const {Post}=require("../model/post")
/**-------------------------------------------
 * @desc Get All Users Profile
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 ----------------------------------------------*/
 module.exports.getAllUsersCtrl=asyncHandler(async(req,res)=>{
    
    const users=await User.find().select("-password");;
    res.status(200).json(users)
 });

 /**-------------------------------------------
 * @desc Get  User Profile
 * @route /api/users/profile/:id
 * @method GET
 * @access public
 ----------------------------------------------*/
  module.exports.getUsersProfileCtrl=asyncHandler(async(req,res)=>{
    
    const user=await User.findById(req.params.id).select("-password").populate("posts");
    if(!user){
   return res.status(404).json({message:"user not found"})
    }
    res.status(200).json(user)
 });
 
 /**-------------------------------------------
 * @desc Update  User Profile
 * @route /api/users/profile/:id
 * @method PUT
 * @access private (only user himself)
 ----------------------------------------------*/
 module.exports.UpdateUserProfileCtrl=asyncHandler(async(req,res)=>{
   const{error}=validateUpdateUser(req.body);
   if(error){
      return res.status(400).json({message:error.details[0].message})
  }
  if(req.body.password){
   const salt=await bcrypt.genSalt(10);
   req.body.password=await bcrypt.hash(req.body.password,salt);
  } 
  const updateUser=await User.findByIdAndUpdate(req.params.id,{
   $set:{
      username:req.body.username,
      password:req.body.password,
      bio:req.body.bio 
   }
  },{new:true}).select("-password").populate("posts");
  res.status(200).json(updateUser)
 });
 /**-------------------------------------------
 * @desc Get  Users Count
 * @route /api/users/count
 * @method GET
 * @access private (only admin)
 ----------------------------------------------*/
 module.exports.getUsersCountCtrl=asyncHandler(async(req,res)=>{
    
   const count = await User.countDocuments();
   res.status(200).json(count)
});
/**-------------------------------------------
 * @desc  Profile photo upload
 * @route /api/users/profile/profile-photo-upload
 * @method POST
 * @access private (only logged in user)
 ----------------------------------------------*/
 module.exports.profilePhotoUploadCtrl = asyncHandler(async(req,res)=>{
   //1. Validation
     if(!req.file)
     {
      return res.status(400).json({message:"no file provider"})
     }
     //2. Get the path to the image
      const imagePath=path.join(__dirname , `../images/${req.file.filename}`)  
     //3. Upload the cloudinary
     const result=await cloudinaryUploadImage(imagePath)
     console.log(result)
     //4. Get the user from DB
     const user=await User.findById(req.user.id)
     //5. Delete the old profile photo if exsit
     if(user.profilephoto.publicId !== null ){
      await cloudinaryRemoveImage(user.profilephoto.publicId)
     }
     //6. change the profilephoto filed in the DB
     user.profilephoto={
      url:result.secure_url,
      publicId:result.public_Id
     }
     await user.save()
     //7. send response to client 

   res.status(200).json({message:"your profile photo upload successfully",profilephoto:{
           url:result.secure_url,
      publicId:result.public_Id
   }})
   //8. Remove image from the server
   fs.unlinkSync(imagePath)
});
/**-------------------------------------------
 * @desc Delete Users Profile
 * @route /api/users/profile/:id
 * @method Delete
 * @access private (only admin or user himeself)
 ------------------------------------------(----*/
 module.exports.deleteUserProfileCtrl=asyncHandler(async(req,res)=>{
   // 1 Get the user form DB
   const user=await User.findById(req.params.id)
   if(!user){
      return res.status(404).json({message:"user not found"})
   }
    
   // 2 GET all posts from DB
    const posts=await Post.find({user:user._id})

    // 3 Get the publicids from the posts
    const publicIds=posts?.map( (post) => post.image.publicId);

    //4 Delete All posts image from cloudinary that belong to this user 
    if(publicIds?.length>0){
      await cloudinaryRemoveMaltiImage(publicIds)
    }
 
   //5 delete the profile picture form cloudinary
   if(user.profilephoto.publicId !== null){
      await cloudinaryRemoveImage(user.profilephoto.publicId);

   }

   // 6 Delte user Post and Comment
   await Post.deleteMany({user:user._id});
   await Comment.deleteMany({user:user._id});

   //7  delete the user himeself
   await User.findByIdAndDelete(req.params.id);

   //8 send the response to the client
   res.status(200).json({message:"your profile has been deleted"})
 })