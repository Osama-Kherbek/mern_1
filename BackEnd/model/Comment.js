const mongoose=require("mongoose");
const joi =require("joi");

// comment Schema
const CommentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    test:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },

},{timestamps:true,})

//Comment model
const Comment=mongoose.model("Comment",CommentSchema)

//Validate Create Comment 
function validateCreateComment(obj){
    const schema=joi.object({
        postId:joi.string().required().label("Post ID"),
        test:joi.string().trim().required(),
    });
    return schema.validate(obj);
}
//Validate Update Comment 
function validateUpdateComment(obj){
    const schema=joi.object({
        test:joi.string().trim().required(),
    });
    return schema.validate(obj);
}

module.exports={
    Comment,
    validateCreateComment,
    validateUpdateComment
}