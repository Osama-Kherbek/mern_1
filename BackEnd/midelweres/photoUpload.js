const path=require("path");
const multer=require("multer");

//photo Storage
const photoStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../Images"))
    },
    filename:function(req,file,cb){
        if(file){
            cb(null,new Date().toISOString().replace(/:/g,"-")+file.originalname)
        }else{
            cb(null,false)
        }
    }
});
//photo upload middlewere
const photoUpload=multer({
    storage:photoStorage,
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message:"Unsupported File format"},false)
        }
    },
    limits:{fileSize:1024*1024}// 1  megabyte
});
module.exports=photoUpload;
