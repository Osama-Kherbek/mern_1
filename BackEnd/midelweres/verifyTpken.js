const jwt=require("jsonwebtoken");

//verifyToken

function verifyToken(req,res,next){
    const authToken=req.headers.authorization;
    if(authToken){
        const token=authToken.split(" ")[1];
        try{
              const decodedPayload=jwt.verify(token,process.env.JWT_SECRET);
              req.user=decodedPayload
              next();
        }catch(error)
        {
            return res.status(401).json({message:"invalid token, acess denied"}) 
        }
    }
        else{
                 return res.status(401).json({message:"no token provided , acces denied"})
        }
}
// Verify Token & Admin
function verifyTokenAnAdmin(req,res,next){
    verifyToken(req,res, () =>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message:"not allowed , only admin"})
        }
    })
}

// Verify Token & only user Himeself
function verifyTokenAndOnlyUser(req,res,next){
    verifyToken(req,res, () =>{
        if(req.user.id===req.params.id){
            next();
        }else{
            return res.status(403).json({message:"not allowed , only User himself"})
        }
    })
}



// Verify Token & Authorization
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res, () =>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message:"not allowed , only User himself or Admin"})
        }
    })
}






module.exports={
    verifyToken,
    verifyTokenAnAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}