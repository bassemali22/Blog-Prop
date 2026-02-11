const {
  getAllUserCtrl,
  getUserProfleCtrl,
  updateUserProfleCtrl,
  getUserCountCtrl,
  profilePhotoUpladCtrl,
} = require("../controllers/usersController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectid");
const photoUpload = require("../middlewares/photoUpload");
const router = require("express").Router();

router.route("/profile").get(verifyTokenAndAdmin, getAllUserCtrl);

router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfleCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfleCtrl);

router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUpladCtrl);

router.route("/count").get(verifyTokenAndAdmin, getUserCountCtrl);

module.exports = router;
