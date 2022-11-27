import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import MyOrderCard from "./MyOrderCard";
import PaymentModal from "./PaymentModal";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function BuyerDashboard() {
	const { user } = useContext(AuthContext);
	// const [orders, setOrders] = useState([]);
	const [product, setProduct] = useState('');
	// const [loading, setLoading] = useState(true);
	const [payment, setPayment] = useState(false);

	const { isLoading, data: myOrders = [], refetch } = useQuery({
		queryKey: ['myOrders'],
		queryFn: () => fetch(`http://localhost:5000/myOrders?email=${user.email}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		}).then(res => res.json())
	})

	// useEffect(() => {
	// 	fetch(`http://localhost:5000/myOrders?email=${user.email}`, {
	// 		headers: {
	// 			authorization: `Bearer ${localStorage.getItem('accessToken')}`
	// 		}
	// 	})
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setOrders(data);
	// 			setLoading(false);
	// 		})
	// }, [user]);

	// const fetchOrder = () => {
	// 	if (user) {
	// 		fetch(`http://localhost:5000/myOrders?email=${user?.email}`, {
	// 			headers: {
	// 				authorization: `Bearer ${localStorage.getItem('accessToken')}`
	// 			}
	// 		})
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				setOrders(data);
	// 				setLoading(false);
	// 			})
	// 	}
	// }

	// const {isLoading, error, data } = useQuery("")

	// const { data: test = [] } = useQuery({
	// 	queryKey: ['myOrders'],
	// 	queryFn: fetchOrder,
	// })

	return (
		<section className="lg:flex">
			<div className="grid place-content-center lg:block">
				<ul className="menu menu-horizontal lg:menu-vertical lg:w-52 bg-base-200">
					<li className={`bordered`}><a>My orders</a></li>
				</ul>
			</div>

			{
				isLoading && <div className='mt-10 grid place-items-center'>
					<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "8rem", "--thickness": "1rem" }}></div>
				</div>
			}

			<div className="w-10/12 gap-4 mx-auto grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{
					myOrders.map((order) => <MyOrderCard key={order._id} order={order} setProduct={setProduct} setPayment={setPayment} />)
				}
			</div>

			{/* payment modal */}
			<Elements stripe={stripePromise}>
				{
					payment && <PaymentModal product={product} setPayment={setPayment} refetch={refetch} />
				}
			</Elements>
		</section>
	);
}

export default BuyerDashboard;