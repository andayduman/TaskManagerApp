import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, token } = authContext;
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? <Redirect to="/login" /> : <Component {...rest} />
        }
      />
    </div>
  );
};

export default PrivateRoute;
