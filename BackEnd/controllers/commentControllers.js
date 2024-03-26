const asyncHandler=require("express-async-handler");
const{Comment,validateCreateComment,validateUpdateComment}=require("../model/Comment")
const {User}=require("../model/User")
/**-------------------------------------------
 * @desc Create New Comment
 * @route /api/comments
 * @method POST
 * @access private (only logged user)
 ----------------------------------------------*/

 module.exports.createCommentCtrl=asyncHandler(async(req,res)=>{
    const{error}=validateCreateComment(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const profile=await User.findById(req.user.id);

    const comment=await Comment.create({
        postId:req.body.postId,
        test:req.body.test,
        user:req.user.id,
        username:profile.username
    });
    res.status(201).json(comment);
 })

 /**-------------------------------------------
 * @desc Get All Comment
 * @route /api/comments
 * @method Get
 * @access private (only Admin)
 ----------------------------------------------*/

 module.exports.GetAllCommentsCtrl=asyncHandler(async(req,res)=>{
    const comments=await Comment.find().populate("user")
     res.status(200).json(comments)
 })

 
 /**-------------------------------------------
 * @desc Delete Comment
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only Admin or owner the post)
 ----------------------------------------------*/
 module.exports.deleteCommentCtrl=asyncHandler(async(req,res)=>{
    const comment=await Comment.findById(req.params.id)
    if(!comment){
       return res.status(404).json({message:"Comment not Found"})
    }
    if(req.user.isAdmin || req.user.id== comment.user.toString()){
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"comment has been delted"})
    }else{
        res.status(403).json({message:"access denied:not allowed"})
    }
 });

 /**-------------------------------------------
 * @desc Update Comment
 * @route /api/comments/:id
 * @method  PUT
 * @access private (only owner of the comment)
 ----------------------------------------------*/

 module.exports.updateCommentCtrl=asyncHandler(async(req,res)=>{
    const{error}=validateUpdateComment(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        return res.status(404).json({message:"comment not found"});
    }

    if(req.user.id !== comment.user.toString())
    {
        return res.status(403).json({message:"access denied,only user himeself can edit comment "})
    }
    const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{
        $set:{
            test:req.body.test
        }
    },{nwe:true});
    res.status(200).json(updatedComment)
 })