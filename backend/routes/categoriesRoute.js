const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoryController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { model } = require("mongoose");
const ValidObjectId = require("../middlewares/validateObjectid");

const router = require("express").Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategoriesCtrl);
  router
  .route("/:id").delete(ValidObjectId, verifyTokenAndAdmin,deleteCategoryCtrl)
module.exports = router;
