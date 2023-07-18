// import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/sessionSlice";

const NavBar = () => {
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const renderLinks = () => {
    if (loggedIn) {
      return (
        <div className="auth-navbar-container">
          <Link className="my-trips" to="/user/:user_id">
            MY PROFILE
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      );
    } else {
      return (
        <div className="splash-navbar-container">
          <div className="nav-splash-container">
            <Link to="/">
              <img
                alt="splash-logo"
                className="splash-logo"
                src="https://i.ibb.co/HdM0KxR/logo.png"
              />
              <div className="splash-logo-text">Tripster</div>
            </Link>
          </div>
          <div className="splash-session-options-container">
            <div>
              <Link to="/signup">SIGNUP</Link>
            </div>
            <div>
              <Link to="/login">LOGIN</Link>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderLinks()}</div>;
};

export default NavBar;
