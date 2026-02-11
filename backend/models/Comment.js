const mongoose = require("mongoose");
const Joi = require("joi");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

function vaildataCreateComment(obj) {
  const Schema = Joi.object({
    postId: Joi.string().required().label("Post ID"),
    text: Joi.string().trim().required().label("Text"),
  });
  return Schema.validate(obj);
}

function vaildataUpdateComment(obj) {
  const Schema = Joi.object({
    text: Joi.string().trim().required(),
  });
  return Schema.validate(obj);
}

module.exports = {
  Comment,
  vaildataCreateComment,
  vaildataUpdateComment,
};
