const asyncHandler = require("express-async-handler");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

/**

  @desc register New User 
  @router   /api/auth/register
  @method   POST
  @access   public
 */

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "this email is already used" });
  }
  const salt = await bcrypt.genSalt(10);
  const Hashedpassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: Hashedpassword,
  });
  await user.save();
  return res
    .status(201)
    .json({ message: "you register successfully, pleas login" });
});

/**

  @desc     login  User 
  @router   /api/auth/login
  @method   POST
  @access   public
 */

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json(400).json({ message: "invalid email or password" });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    res.status(400).json({ message: "invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
  });
});
