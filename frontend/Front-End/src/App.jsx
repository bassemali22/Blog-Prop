import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreatePost from "./page/create-post/CreatePost";
import Home from "./page/home/Home";
import Login from "./page/forms/Login";
import Register from "./page/forms/Register";
import PostsPage from "./page/post-page/PostsPage";
import Footer from "./components/footer/Footer";
import PostDetails from "./page/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Profile from "./page/profile/Profile";
import UsersTable from "./page/admin/UsersTable";
import PostsTable from "./page/admin/PostsTable";
import CategoriesTable from "./page/admin/CategoriesTable";
import AdminDashboard from "./page/admin/AdminDashboard";
import ForgotPassword from "./page/forms/ForgotPassword";
import ResetPassword from "./page/forms/ResetPassword";
import NotFound from "./page/not-found/NotFound";
import { useSelector } from "react-redux";
import Category from "./page/category/Category";
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route
            path="create-post"
            element={user ? <CreatePost /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>
        {/* admin dashboard */}
        <Route path="admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="comments-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
