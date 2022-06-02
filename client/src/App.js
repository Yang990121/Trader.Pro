import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/DashboardPage/Dashboard";
import Discover from "./components/DiscoveryPage/Discover";
import News from "./components/NewsPage/News";
import SignIn from "./components/AuthanticationPage/SignIn";
import SignUp from "./components/AuthanticationPage/SignUp";
import Register from "./components/AuthanticationPage/Register";
import Login from "./components/AuthanticationPage/Login";
// import DashboardPage from "./pages/DashboardPage";
// import DiscoverPage from "./pages/DiscoverPage";
// import NewsPage from "./pages/NewsPage";

function App() {
	const user = localStorage.getItem("token");

	return (
		<div className="App">
			<Routes>
				{/* {user && <Route path="/" exact element={<Dashboard />} />}
        <Route path="/signup" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} /> */}
				<Route path="/" element={<Dashboard />} />
				<Route path="Discover" element={<Discover />} />
				<Route path="News" element={<News />} />
				<Route path="SignIn" element={<SignIn />} />
				<Route path="SignUp" element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
