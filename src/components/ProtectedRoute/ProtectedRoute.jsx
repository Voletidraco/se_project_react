import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isCheckingAuth, children }) {
  if (isCheckingAuth) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
