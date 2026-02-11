const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryReomeImage,
  cloudinaryUploadImage,
  cloudinaryReomeMultipleImage,
} = require("../utils/cloudinary");
const { url } = require("inspector");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");

/**

  @desc     Get All  User 
  @router   /api/users/profile
  @method   GET
  @access   Private (only Admin)
 */

module.exports.getAllUserCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  return res.status(200).json(users);
});
/**

  @desc     Get   Users Count
  @router   /api/users/count
  @method   GET
  @access   Private (only Admin)
 */

module.exports.getUserCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

/**

  @desc     Get  User Profile 
  @router   /api/users/profile/:id
  @method   GET
  @access  Public
 */

module.exports.getUserProfleCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
});
/**

  @desc     Update  User Profile 
  @router   /api/users/profile/:id
  @method   PUT
  @access  private(only user himself)
 */

module.exports.updateUserProfleCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate("posts");
  res.status(200).json(updateUser);
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
});

/**

  @desc     Delete  User Profile 
  @router   /api/users/profile/:id
  @method   DELETE
  @access   Private (only Admin)
 */

module.exports.deleteUserProfleCtrl = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found " });
    }
    const posts = await Post.find({ user: user._id });

    const publicIds = posts?.map((post) => post.image.publicId);
    if (publicIds?.length > 0) {
      await cloudinaryReomeMultipleImage(publicIds);
    } else {
    }
    if (user.profilePhoto.publicId !== null) {
      await cloudinaryReomeImage(user.profilePhoto.publicId);
    }
    await Post.deleteMany({ user: user._id });
    await Comment.deleteMany({ user: user._id });

    await User.findByIdAndDelete(user.id);
    return res.status(200).json("user deleted");
  } catch (error) {
    return res.json(400).json(error.message);
  }
});

/**

  @desc     Profile  Photo upload 
  @router   /api/users/profile/profile-photo-upload
  @method   POST
  @access   Private (only logged in user)
 */
module.exports.profilePhotoUpladCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "no file provided" });
  }

  const imagepath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagepath);
  const user = await User.findById(req.user.id);

  if (user.profilePhoto.publicId !== null) {
    await cloudinaryReomeImage(user.profilePhoto.publicId);
  }
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.publicId,
  };
  await user.save();
  res.status(200).json({
    message: "your profile photo uploaded successfully",
    profilePhoto: { url: result.secure_url, publicId: result.publicId },
  });
  fs.unlinkSync(imagepath);
});
