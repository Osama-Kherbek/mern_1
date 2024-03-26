const { getAllUsersCtrl,getUsersProfileCtrl, UpdateUserProfileCtrl,getUsersCountCtrl, profilePhotoUploadCtrl,deleteUserProfileCtrl } = require("../controllers/userscontrollers");
const photoUpload = require("../midelweres/photoUpload");
const { verifyTokenAnAdmin,verifyTokenAndOnlyUser,verifyToken, verifyTokenAndAuthorization} = require("../midelweres/verifyTpken");
const validateObjectId=require("../midelweres/vlidateobjectid");
const router=require("express").Router();


// /api/users/profile
router.route("/profile").get(verifyTokenAnAdmin,getAllUsersCtrl)

// /api/users/profile/:id
router.route("/profile/:id").get(validateObjectId,getUsersProfileCtrl)
.put(validateObjectId,verifyTokenAndOnlyUser,UpdateUserProfileCtrl)
.delete(validateObjectId,verifyTokenAndAuthorization,deleteUserProfileCtrl)

// /api/users/count
router.route("/count").get(verifyTokenAnAdmin,getUsersCountCtrl)

// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload").post(verifyToken/*,photoUpload.single("image")*/,profilePhotoUploadCtrl)

module.exports=router;