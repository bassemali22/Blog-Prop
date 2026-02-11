const router = require("express").Router();
const validateObjectId = require("../middlewares/validateObjectid");
const {
  creatPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  gettPostCountCtrl,
  toggleLikeCtrl,
  updatePostImageCtrl,
} = require("../controllers/postController");
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");

router
  .route("/")
  .post(verifyToken, photoUpload.single("image"), creatPostCtrl)
  .get(getAllPostsCtrl);

router.route("/count").get(gettPostCountCtrl);
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);
router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);

router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );
module.exports = router;
