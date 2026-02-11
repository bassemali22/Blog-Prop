import "./category.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostBasedOnCatogery } from "../../redux/apiCalls/postApiCall";
const Category = () => {
  const dispatch = useDispatch();
  const { postCate } = useSelector((state) => state.post);
  const { category } = useParams();
  console.log(category);

  useEffect(() => {
    dispatch(fetchPostBasedOnCatogery(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category">
      {postCate.length === 0 ? (
        <>
          <h1 className="category-title">
            Posts With <span>{category}</span>category not found
          </h1>
          <Link to="/posts">Go To Posts Page</Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postCate} />
        </>
      )}
    </section>
  );
};

export default Category;
