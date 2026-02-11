import React from "react";
import { Link } from "react-router-dom";
import "./posts.css";
const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;
  console.log(post);
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={post?.image.url} alt="" className="post-item-image" />
      </div>
      <div className="post-item info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link to={profileLink}>
              {username ? username : post?.user.username}{" "}
            </Link>
          </div>
          <div className="post-item-data">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post?.title}</h4>
          <Link
            className="post-item-category"
            to={`/posts/categories/${post?.category}`}
          >
            {post?.category}
          </Link>
        </div>
        <p className="post-item-description">
          {post?.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ab
          dicta quod consequuntur quae accusantium labore, alias distinctio eum
          inventore nesciunt nulla ducimus, et, aperiam atque. Quam dolor
          laudantium minima?
        </p>
        <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
          Read More....
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
