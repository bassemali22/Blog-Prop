import React, { useEffect, useState } from "react";
import "./posts-page.css";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { categories } from "../../dummyData";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;
const PostsPage = () => {
  const dispatch = useDispatch();
  const { postCount, posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postCount / POST_PER_PAGE);
  useEffect(() => {
    dispatch(fetchPost(currentPage));
    window.scroll(0, 0);
  }, [currentPage]);
  useEffect(() => {
    dispatch(getPostsCount());
  }, []);
  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostsPage;
