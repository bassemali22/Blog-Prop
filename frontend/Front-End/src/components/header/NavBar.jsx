import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const NavBar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <nav
        className="navbar"
        style={{
          clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <ul className="nav-links">
          <Link to="/" onClick={() => setToggle(false)} className="nav-link">
            <i className="bi bi-house"></i> Home
          </Link>
          <Link
            to="/posts"
            onClick={() => setToggle(false)}
            className="nav-link"
          >
            <i className="bi bi-stickies"></i> Post
          </Link>
          {user && (
            <Link
              to="posts/create-post"
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i className="bi bi-journal-plus"></i> Create
            </Link>
          )}
          {user?.isAdmin && (
            <Link
              to="admin-dashboard"
              onClick={() => setToggle(false)}
              className="nav-link"
            >
              <i className="bi bi-person-check"></i> Admin Dashoard
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
