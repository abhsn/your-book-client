import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function PrivateRoute({ children }) {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return (
			<div className='my-10 grid place-items-center'>
				<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "12rem", "--thickness": "1rem" }}></div>
			</div>
		);
	} else {
		if (user) {
			return <>{children}</>;
		} else {
			return (
				<Navigate to="/login" state={{ from: location }} replace></Navigate>
			);
		}
	}
}

export default PrivateRoute;