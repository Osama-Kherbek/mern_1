const mongoose=require('mongoose')

module.exports=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_CLOUD_URI);
       console.log("Connected To MongoDB")
    }catch(error){
      console.log("connected filed to mngodb",error)
    }
}