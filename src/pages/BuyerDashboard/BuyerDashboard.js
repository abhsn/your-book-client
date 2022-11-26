import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import MyOrderCard from "./MyOrderCard";
import PaymentModal from "./PaymentModal";

const stripePromise = loadStripe('pk_test_51M85jYF6gi7KjTmSvG8CUziTDE0y1BYKvGjeU6lkMY0vAtj4azOUzMoqArxaEwVVisOxuprKI4wgPKQGQe0WPZ5w00vcJcI27z');

function BuyerDashboard() {
	const { user } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	const [product, setProduct] = useState('');
	console.log(product);

	useEffect(() => {
		fetch(`http://localhost:5000/myOrders?email=${user.email}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => setOrders(data))
	}, [user]);

	return (
		<section className="lg:flex">
			<div className="grid place-content-center lg:block">
				<ul className="menu menu-horizontal lg:menu-vertical lg:w-52 bg-base-200">
					<li className={`bordered`}><a>My orders</a></li>
				</ul>
			</div>

			<div className="w-10/12 gap-4 mx-auto grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{
					orders.map((order) => <MyOrderCard key={order._id} order={order} setProduct={setProduct} />)
				}
			</div>

			{/* payment modal */}
			<Elements stripe={stripePromise}>
				<PaymentModal product={product} />
			</Elements>
		</section>
	);
}

export default BuyerDashboard;