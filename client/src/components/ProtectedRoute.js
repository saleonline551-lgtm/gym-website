import React from "react";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  const user = localStorage.getItem("user");

  // NORMAL LOGIN OR GOOGLE LOGIN

  if (!token && !user) {

    return <Navigate to="/login" />;

  }

  return children;

}

export default ProtectedRoute;