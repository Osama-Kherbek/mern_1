const asyncHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const {User,validateEmail,validateNewPassword}=require("../model/User");
const crypto=require("crypto");
const sendEmail=require("../util/sendEmail");
const VerificationToken = require("../model/VerificationToken");


/**-------------------------------------------
 * @desc Sent reset password link
 * @route /api/password/reset-password-link
 * @method POST
 * @access public
 ----------------------------------------------*/
 module.exports.sendResetPasswordLinkCtrl=asyncHandler(async(req,res)=>{
    // validation
    const {error} =validateEmail(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //get the user from db by email
    const user=await  User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({message:"User with given email dose not exist"})
    }
    //creating verificationToken
    let verificationToken = await VerificationToken.findOne({userId:user._id})

    if(!verificationToken){
        verificationToken=new VerificationToken({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
        })
        await verificationToken.save()
    }
    //Creating Link
    const link =`${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`

    //Creating HTML Template
    const htmlTemplate=`<a href="${link}">Click here to reset your password</a>`;

    //sending Email
    await sendEmail(user.email,"Reset Password",htmlTemplate)
    //response to the client 
    res.status(200).json({
        message:"Password reset link sent to your email , please check your inbox "
    })
 })
 /**-------------------------------------------
 * @desc Get reset password link
 * @route /api/password/reset-password/:userId/:token 
 * @method GET
 * @access public
 ----------------------------------------------*/
 module.exports.getResetPasswordLinkCtrl = asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.userId)
    if(!user){
        return res.status(400).json({message:"invalid link"})
    }
    const verificationToken=await VerificationToken.findOne({
        userId:user._id,
        token:req.params.token
    })
    if(!verificationToken){
        return res.status(400).json({message:"invalid link"})
    }
    res.status(200).json({message:"Valid url"})
 })
 /**-------------------------------------------
 * @desc  Reset password 
 * @route /api/password/reset-password/:userId/:token 
 * @method POST
 * @access public
 ----------------------------------------------*/
 module.exports.resetPasswordCtrl=asyncHandler(async(req,res)=>{
    // validation
    const {error} =validateNewPassword(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //get the user from db by email
    const user= await  User.findById(req.params.userId)
    if(!user){
        return res.status(400).json({message:"invalid link"})
    }  
    const verificationToken= await VerificationToken.findOne({
        userId:user._id,
        token:req.params.token,
    })
    if(!verificationToken){
        return res.status(400).json({message:"invalid link"})
    } 
    if(!user.isAccountVerified){
        user.isAccountVerified=true;
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    user.password=hashedPassword;
    await user.save();
    // await verificationToken remove
    res.status(200).json({message:"Password reset successfully , plase login "})
 })