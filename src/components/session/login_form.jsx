import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../slices/sessionSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.currentUser);

  useEffect(() => {
    if (currentUser === true) {
      history.push("/profile");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  //   const handleClearErrors = () => {
  //     dispatch(receiveErrors([]));
  //   };

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, idx) => (
          <li className="login-form-errors-element" key={`error-${idx}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
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
            <br />
          </div>

          <div className="login-form-errors">{renderErrors()}</div>

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
