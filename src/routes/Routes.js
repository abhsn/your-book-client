import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboadLayout";
import Main from "../layout/Main";
import CategoryDetails from "../pages/CategoryDetails/CategoryDetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";
import Register from "../pages/Register/Register";

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/register',
				element: <Register />
			},
			{
				path: '/category/:id',
				element: <PrivateRoute><CategoryDetails /></PrivateRoute>
			},
			{
				path: '*',
				element: <div>Page not found</div>
			}
		]
	},
	{
		path: '/dashboard',
		element: <DashboardLayout />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />
			}
		]
	}
]);