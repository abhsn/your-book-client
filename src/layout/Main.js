import { Outlet } from "react-router-dom";
import Header from "../pages/shared/Header/Header";

function Main() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

export default Main;