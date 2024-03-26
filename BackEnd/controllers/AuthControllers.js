const asyncHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const {User,validateRegisterUser,validateLoginUser}=require("../model/User");
const crypto=require("crypto");
const sendEmail=require("../util/sendEmail");
const VerificationToken = require("../model/VerificationToken");
/**-------------------------------------------
 * @desc Register New User   Sign Up
 * @route /api/auth/register
 * @method POST
 * @access public
 ----------------------------------------------*/
 module.exports.registerUserCtrl=asyncHandler(async(req,res)=>{
    const {error}=validateRegisterUser(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({message:"User already exist"});
    }
    const salt=await bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    user=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
    })
    await user.save()
    //creating new VerufictionToken & save it toDB
   const verifictionToken = new VerificationToken({
    userId:user._id,
    token:crypto.randomBytes(32).toString("hex")
   }) 
   await verifictionToken.save()
    
   const link=`${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verifictionToken.token}`;

   const htmlTemplate=`
   <div>
   <p>Click on the link below to verify your email</p>
   <a href="${link}">Verify</a>
   </div>`

   await sendEmail(user.email,"Verify Your Email",htmlTemplate )
    res.status(201).json({message:"we sent to you an email ,plase verify your email adderss"});

 });
 /**-------------------------------------------
 * @desc Login user
 * @route /api/auth/login
 * @method POST
 * @access public
 ----------------------------------------------*/
 module.exports.loginUserCtrl=asyncHandler(async(req,res)=>{
    //validtion
        const {error}=validateLoginUser(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }

         //user is exist
        const user=await User.findOne({email:req.body.email})
        if(!user)
        {
            return res.status(400).json({message:"invalid email or password"})
        }
    //chack the password
  
    const ispasswordMatch=await bcrypt.compare(req.body.password,user.password)
        if(!ispasswordMatch)
        {
            return res.status(400).json({message:"invalid email or password"})
        }

    //generate token(jwt)
     if(!user.isAccountVerified){
        let verificationToken = await VerificationToken.findOne({
            userId:user._id,
        })
        if(!verificationToken){
            verificationToken=new VerificationToken({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex")
            });
            await verificationToken.save()
        }
    
    const link =`${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;
    const htmlTemplate =
  `<div>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify</a>
    </div>
    `
    await sendEmail(user.email,"Verify your email",htmlTemplate)
        res.status(400).json({message:"we sent to you an email ,plase verify your email adderss"});
     }
    const token=user.generateAuthToken();

    //response to client

    res.status(200).json({
        _id:user._id,
        isAdmin:user.isAdmin,
        profilePhoto:user.profilephoto,
        token,
        username:user.username
    });
 });

  /**-------------------------------------------
 * @desc Verify User Account
 * @route /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 ----------------------------------------------*/
 module.exports.verifyUserAccountCtrl = asyncHandler(async(req,res)=>{
    const user= await User.findById(req.params.userId);
    if(!user){
        return res.status(400).json({message:"Invalid link"})
    }
    const verificationToken= await VerificationToken.findOne({
        userId:user._id,
        token:req.params.token,
    })
    if(!verificationToken){
        return res.status(400).json({message:"Invalid link"})
    }
    user.isAccountVerified=true;
    await user.save()
    await verificationToken.remove();
    res.status(200).json({message:"Your account verified"})
       
 })