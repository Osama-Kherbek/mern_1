const router=require("express").Router();
const{verifyTokenAnAdmin, verifyToken}=require("../midelweres/verifyTpken")
const{createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl}=require("../controllers/categorysControllers")
const validateObjectId=require("../midelweres/vlidateobjectid");

// /api/categories
router.route("/").post(verifyTokenAnAdmin,createCategoryCtrl).get(getAllCategoriesCtrl)
// /api/categories/:id
router.route("/:id").delete(validateObjectId,verifyTokenAnAdmin,deleteCategoryCtrl)
module.exports=router;