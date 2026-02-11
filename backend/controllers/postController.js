const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");
const {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} = require("../utils/cloudinary");
//const { clud } = require("../utils/cloudinary");

const { Comment } = require("../models/Comment");
/**

  @desc     Creat New Post 
  @router   /api/posts
  @method   POST
  @access   Private (only logged in user)
 */

module.exports.creatPostCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id, // ✅ صح
    },
  });
  fs.unlinkSync(imagePath);
  res.status(201).json(post);
});

/**

  @desc     Get All Posts 
  @router   /api/posts
  @method   GET
  @access   Public
 */

module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category } = req.query;
  let posts;
  if (pageNumber) {
    posts = await Post.find()
      .skip((Number(pageNumber) - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category });
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(posts);
});

/**

  @desc     Get Single Post
  @router   /api/posts/:id
  @method   GET
  @access   Public
 */

module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", ["-password"])
    .populate("comments");
  if (!post) {
    return res.status(404).json({ message: "not found post" });
  } else {
    return res.status(200).json(post);
  }
});
/**

  @desc     Get Count Posts
  @router   /api/posts/count
  @method   GET
  @access   Public
 */

module.exports.gettPostCountCtrl = asyncHandler(async (req, res) => {
  const posts = await Post.countDocuments();

  return res.status(200).json({ count: posts });
});

/**

  @desc     Delete  Post
  @router   /api/posts/:id
  @method   DELETE
  @access   private (onley admin or owner)
 */

module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "not found post" });
  }
  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);

    await cloudinaryReomeImage(post.image.publicId);
    await Comment.deleteMany({ postId: post._id });
    res
      .status(200)
      .json({ message: "the post has been deleted", postId: post.id });
  } else {
    res.status(403).json({ message: "access denied forbidden" });
  }
});

/**

  @desc     Update  Post
  @router   /api/posts/:id
  @method   PUT
  @access   private (onley admin or owner)
 */

module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).status({ message: error.details[0].message });
  }

  const post = Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json("post not  found");
  }
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied , you are not alowed" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);
  res.status(200).json(updatedPost);
});

/**

  @desc     Toggle  Like
  @router   /api/posts/like/:id
  @method   PUT
  @access   private (onley admin or owner)
 */

module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;

  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );
  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: loggedInUser } },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: loggedInUser } },
      { new: true }
    );
  }
  res.status(200).json(post);
});

module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json("post not  found");
  }
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied , you are not alowed" });
  }
  if (post.image?.publicId) {
    await cloudinaryRemoveImage(post.image.publicId);
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: { url: result.secure_url, publicId: result.public_id },
      },
    },
    { new: true }
  ).populate("user", ["-password"]);
  fs.unlinkSync(imagePath);
  res.status(200).json(updatedPost);
});
