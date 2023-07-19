import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { signup, login } from "../../slices/sessionSlice";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.isSignedIn) {
      history.push("/login");
    }
  }, [session, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      password2,
    };

    dispatch(signup(user, history)).catch((error) => {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    });
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email: "demo@gmail.com", password: "password" }));
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
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
          <h1 className="signup-form-header">Welcome to Tripster</h1>
          <div className="signup-form-input-container">
            <input
              className="signup-form-input-element"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
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
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
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
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
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
            {errors.password2 && (
              <div className="error-message">{errors.password2}</div>
            )}
          </div>

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
