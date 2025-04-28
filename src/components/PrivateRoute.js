// // components/PrivateRoute.js
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// // Mock authentication function
// const isAuthenticated = () => {
//   // Here you would implement your actual authentication check (e.g., checking a token)
//   return !!localStorage.getItem("authToken"); // Example: Check if a token exists in local storage
// };

// const PrivateRoute = () => {
//   return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  // Here you would replace this example with your actual auth check
  const isAuthenticated = false; // Replace with logic to check if user is authenticated

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
