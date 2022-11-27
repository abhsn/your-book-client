import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer/Footer";
import Header from "../pages/shared/Header/Header";

function Main() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default Main;