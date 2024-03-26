const router=require("express").Router();
const { createCommentCtrl, GetAllCommentsCtrl,deleteCommentCtrl, updateCommentCtrl } = require("../controllers/commentControllers");
const{verifyToken,verifyTokenAnAdmin}=require("../midelweres/verifyTpken")
const validateObjectId=require("../midelweres/vlidateobjectid")
// /api/comments
router.route("/").post(verifyToken,createCommentCtrl)
.get(verifyTokenAnAdmin,GetAllCommentsCtrl)

// /api/comments/:id
router.route("/:id").delete(validateObjectId,verifyToken,deleteCommentCtrl)
.put(validateObjectId,verifyToken,updateCommentCtrl)
module.exports=router;