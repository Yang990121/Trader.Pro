import * as React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./components/DashboardPage/Dashboard";
import Discover from './components/DiscoveryPage/Discover';
import News from './components/NewsPage/News';
import SignIn from "./components/AuthanticationPage/SignIn";
import SignUp from "./components/AuthanticationPage/SignUp";

import { useDispatch } from "react-redux";
import { logoutUser } from "./components/actions/authActions";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import ResetPassword from "./components/AuthanticationPage/ResetPassword";
import ConfirmEmail from "./components/AuthanticationPage/ConfirmEmail";
import NotVerified from "./components/AuthanticationPage/NotVerified";
import ForgotPassword from "./components/AuthanticationPage/ForgotPassword";
import Toast from "./components/common/Toast";

// import DashboardPage from "./pages/DashboardPage";
// import DiscoverPage from "./pages/DiscoverPage";
// import NewsPage from "./pages/NewsPage";




function App() {
  const user = localStorage.getItem("token");
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Toast />

      <Routes>
        {/* {user && <Route path="/" exact element={<Dashboard />} />}
        <Route path="/signup" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} /> */}
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="login" element={<SignIn />}/> */}
        

        {/* Public Routes */}
        
          
          <Route path="/register" element={<SignUp />}/>
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/unverified-user" element={<NotVerified />} />
          <Route path="/confirmEmail/:token" element={<ConfirmEmail />} />
          <Route path="*" element={<SignIn />}/> 
          
        



        {/* Protected Routes */}
        <Route path ="/" element={<ProtectedRoute />} >
          <Route path="/logout" render={() => dispatch(logoutUser())} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="Discover" element={<Discover />} />
          <Route path="News" element={<News />} />
          
        </Route>

        
         
      </Routes>
    </div>

    // If you go to a random /???? after logging in, white screen will appear
  );
}



export default App;