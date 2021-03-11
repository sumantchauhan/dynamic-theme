import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRouter = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {}, [isAuthenticated]);
  return isAuthenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : null;
};

export default AuthRouter;
