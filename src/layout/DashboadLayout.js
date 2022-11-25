import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Header/Header";

function DashboardLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

export default DashboardLayout;