import React from "react";
import { Route, Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, render, ...rest }) { //USE THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated ? (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Navigate to="/login" />;
        if (isAuthenticated && !user.isVerified)
          return <Navigate to="/unverified-user" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  ) : <Navigate to ="/login" />;
}

const useAuth = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
}

const ProtectedRoutes = (props:any) => {
  const auth = useAuth();
  return auth ? <Outlet/> : <Navigate to="/login" />;
}



export default ProtectedRoutes;
