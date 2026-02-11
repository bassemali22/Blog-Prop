import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogoustUser } from "../../redux/apiCalls/authApiCall";
const HeaderRight = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [dropDown, setDropDown] = useState(false);

  const logoutHandler = () => {
    setDropDown(false);
    dispatch(LogoustUser());
  };
  return (
    <div>
      <div className="header-right">
        {user ? (
          <>
            <div className="header-right-user-info">
              <span
                onClick={() => setDropDown((prev) => !prev)}
                className="header-rigth-username"
              >
                {user?.username}
              </span>
              <img
                src={user?.profilePhoto.url}
                alt="user photo"
                className="header-right-user-photo"
              />
              {dropDown && (
                <div className="header-right-dropdown">
                  <Link
                    className="header-dropdown-item"
                    to={`profile/${user._id}`}
                    onClick={() => setDropDown(false)}
                  >
                    <i className="bi-file-person"></i>
                    <span>Profile</span>
                  </Link>
                  <div onClick={logoutHandler} className="header-dropdown-item">
                    <i className="bi-box-arrow-in-left"></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="header-right-link">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </Link>
            <Link to="/register" className="header-right-link">
              <i className="bi bi-person-plus"></i>
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderRight;
