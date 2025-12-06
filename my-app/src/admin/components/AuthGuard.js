// components/AuthGuard.js
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  // Check if user is authenticated (you can use localStorage, context, or redux)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default AuthGuard;