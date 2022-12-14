import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import Dashboard from "../Dashboard/Dashboard";
import BuyerDashboard from "../BuyerDashboard/BuyerDashboard";
import toast from "react-hot-toast";
import SellerDashboard from "../SellerDashboard/SellerDashboard";

function AdminRoute() {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	const [userType, setUserType] = useState('');
	const [adminLoading, setAdminLoading] = useState(true);
	useEffect(() => {
		fetch(`https://b612-used-products-resale-server-side-abhsn.vercel.app/userType?email=${user.email}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.message === 'forbidden') {
					toast.error('An error occurred. Please try to log out and log in again.');
				}
				setUserType(data.userType);
				setAdminLoading(false);
			});
	}, [user]);

	if (loading) {
		return (
			<div className='mt-10 grid place-items-center'>
				<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "8rem", "--thickness": "1rem" }}></div>
			</div>
		);
	} else {
		if (user) {
			if (adminLoading) {
				return (
					<div className='mt-10 grid place-items-center'>
						<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "8rem", "--thickness": "1rem" }}></div>
					</div>
				);
			} else {
				if (userType === 'admin') {
					return <Dashboard />
				} else if (userType === 'seller') {
					return <SellerDashboard />
				} else if (userType === 'buyer') {
					return <BuyerDashboard />
				} else {
					toast.error('An error occurred. Please try again.')
				}
			}

		} else {
			return (
				<Navigate to="/login" state={{ from: location }} replace></Navigate>
			);
		}
	}
}

export default AdminRoute;