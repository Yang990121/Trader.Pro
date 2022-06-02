import React from "react";
import { Route, Navigate, Outlet} from "react-router-dom";
import { useSelector } from "react-redux";


const useAuth = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
}

const PublicRoutes = (props:any) => {
  const auth = useAuth();
  return auth ?  <Navigate to="/dashboard" /> : <Outlet/>;
}



export default PublicRoutes;
