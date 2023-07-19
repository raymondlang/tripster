import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../slices/sessionSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setErrors({});
  }, [email, password]);

  const handleLoginSuccess = () => {
    navigate("/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    dispatch(login(user))
      .then((res) => {
        console.log(res);
        handleLoginSuccess();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
        console.log(error.response);
      });
  };

  const renderErrors = () => {
    return (
      <div>
        {errors.email && (
          <p className="login-form-error-message">{errors.email}</p>
        )}
        {errors.password && (
          <p className="login-form-error-message">{errors.password}</p>
        )}
      </div>
    );
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <div className="login-form-subcontainer">
          <h1 className="signup-form-header">Welcome back!</h1>
          <div className="login-form-input-container">
            <input
              className="login-form-input-element"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && (
              <p className="login-form-error-message">{errors.email}</p>
            )}
            <br />
          </div>

          <div className="login-form-input-container">
            <input
              className="login-form-input-element"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {errors.password && (
              <p className="login-form-error-message">{errors.password}</p>
            )}
            <br />
          </div>

          <button className="login-form-submit-btn" type="submit">
            Log In
          </button>

          <div className="login-form-text">
            Don&apos;t have an account? Go ahead and{" "}
            <Link className="login-form-signup-link" to="/signup">
              make one right quick
            </Link>
            .
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
