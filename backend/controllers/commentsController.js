const asyncHandler = require("express-async-handler");
const {
  Comment,
  vaildataCreateComment,
  vaildataUpdateComment,
} = require("../models/Comment");
const { User } = require("../models/User");
/**

  @desc     Create New Comment
  @router   /api/comment
  @method   POST
  @access   private (onley logged in user)
 */

module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = vaildataCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const profile = await User.findById(req.user.id);
  const comment = await new Comment({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });
  await comment.save();
  res.status(201).json(comment);
});

/**

  @desc     Get All Comment
  @router   /api/comment
  @method   GET
  @access   private (onley logged in user)
 */

module.exports.getCommentCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.status(200).json(comments);
});

/**

  @desc     Delete  Comment
  @router   /api/comment
  @method   DELETE
  @access   private (onley logged in user)
 */

module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = Comment.find().populate("user");
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  res.status(200).json(comments);
  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment has been deleted" });
  }
});

/**

  @desc     Update  Comment
  @router   /api/comment
  @method   PUT
  @access   private (onley logged in user)
 */

module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = vaildataUpdateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const comment = Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  if (req.user.id !== comment.user.toString()) {
    // await Comment.findByIdAndDelete(req.params.id);
    res.status(403).json({ message: "access denied, only user" });
  }
  const updateComment = Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  );
  r;
  res.status(200).json(updateComment);
});
