const cloudinary=require("cloudinary");
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NANE,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
//Cloudinary Upload Image
const cloudinaryUploadImage = async(fileToUpload)=>{
    try{
       const data= await cloudinary.uploader.upload(fileToUpload,{
        resource_type:'auto',
       });
       return data;
    }
    catch(error){
        console.log(error)
        throw new Error("Internal Server Error (cloudinary)")
    }
}

//Cloudinary remove Image
const cloudinaryRemoveImage = async(imagePublicId)=>{
    try{
      const result=await cloudinary.uploader.destroy(imagePublicId)
       return result;
    }
    catch(error){
        console.log(error)
        throw new Error("Internal Server Error (cloudinary)")
    }
}

//Cloudinary remove maltipalImage
const cloudinaryRemoveMaltiImage = async(publicId)=>{
    try{
      const result=await cloudinary.v2.api.delete_resources(publicId);
       return result;
    }
    catch(error){
        console.log(error)
        throw new Error("Internal Server Error (cloudinary)")
    }
}


module.exports={
    cloudinaryUploadImage,
    cloudinaryRemoveImage, 
    cloudinaryRemoveMaltiImage
}