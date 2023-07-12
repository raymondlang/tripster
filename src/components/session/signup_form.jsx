import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { signup, login, receiveErrors } from "@/slices/sessionSlice";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const signedIn = useSelector((state) => state.session.isSignedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (signedIn) {
      history.push("/login");
    }
  }, [signedIn, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      password2,
    };
    dispatch(signup(user, history));
  };

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo@gmail.com", password: "password" }));
  };

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(errors).map((error, idx) => (
          <li className="signup-form-errors-element" key={`error-${idx}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-form-subcontainer">
          <h1 className="signup-form-header">Welcome to Backpackr</h1>
          <div className="signup-form-input-container">
            <input
              className="signup-form-input-element"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <br />
          </div>

          <div className="signup-form-input-container">
            <input
              className="signup-form-input-element"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <br />
          </div>

          <div className="signup-form-input-container">
            <input
              className="signup-form-input-element"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br />
          </div>

          <div className="signup-form-input-container">
            <input
              className="signup-form-input-element"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm Password"
            />
            <br />
          </div>

          <div className="signup-form-errors">{renderErrors()}</div>

          <button className="signup-form-submit-btn" type="submit">
            Sign Up
          </button>
          <button className="demo-user-btn" onClick={handleDemo}>
            Demo User
          </button>

          <div className="login-form-text">
            Already have an account? Go ahead and{" "}
            <Link className="signup-form-login-link" to="/login">
              login
            </Link>
            .
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
