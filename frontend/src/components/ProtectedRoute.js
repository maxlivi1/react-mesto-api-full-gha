import React from "react";
import { Navigate } from "react-router-dom";
import { routes } from "../utils/constants";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to={routes.entrance} replace />
  );
};

export default ProtectedRoute;
