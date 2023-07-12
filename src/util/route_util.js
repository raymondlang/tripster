import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.session.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export { AuthRoute, ProtectedRoute };
