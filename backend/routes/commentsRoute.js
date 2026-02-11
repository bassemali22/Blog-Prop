const router = require("express").Router();
const {
  getCommentCtrl,
  updateCommentCtrl,
  createCommentCtrl,
} = require("../controllers/commentsController");
const { deletePostCtrl } = require("../controllers/postController");
const validateObjectid = require("../middlewares/validateObjectid");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getCommentCtrl);
router
  .route("/:id")
  .delete(validateObjectid, verifyToken, deletePostCtrl)
  .put(validateObjectid, verifyToken, updateCommentCtrl);

module.exports = router;
