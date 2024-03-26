const router=require("express").Router();
const { createPostCtrl,getAllPostCtrl,getSinglePostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require("../controllers/postControllers");
const photoUpload=require("../midelweres/photoUpload");
const {verifyToken}=require("../midelweres/verifyTpken");
const validateObjectId=require("../midelweres/vlidateobjectid");
const { validateUpdatePost } = require("../model/post");
// /api/posts
router.route("/").post(verifyToken,photoUpload.single("image"),createPostCtrl)
.get(getAllPostCtrl)

// /api/posts/count
router.route("/count").get(getPostCountCtrl)


// /api/posts/:id
router.route("/:id").get(validateObjectId,getSinglePostCtrl)
.delete(validateObjectId,verifyToken,deletePostCtrl)
.put(validateObjectId,verifyToken,updatePostCtrl)

// /api/posts/update-image/:id
router.route("/update-image/:id").put(validateObjectId,verifyToken,photoUpload.single("image"),updatePostImageCtrl)

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectId,verifyToken,toggleLikeCtrl)

module.exports=router;