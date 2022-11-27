import { useEffect, useState } from "react";

function MyOrderCard({ order, setProduct, setPayment }) {
	const { productId, status } = order;
	const [item, setItem] = useState({});

	useEffect(() => {
		fetch(`http://localhost:5000/getProductDetails?id=${productId}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => setItem(data));
	}, [productId]);

	const { _id, productName, img, resalePrice, buyer } = item;
	return (
		<div className="card card-compact bg-base-100 shadow-xl">
			<figure><img src={img} alt={productName} className="w-40 h-60 object-cover" /></figure>
			<div className="card-body">
				<h2 className="card-title">{productName}</h2>
				<p>Price: ${resalePrice}</p>
				<div className="card-actions justify-end">
					{
						status === 'paid' ?
							<button className="btn" disabled>Paid</button> :
							<><label onClick={() => {
								setProduct(item);
								setPayment(true);
							}} htmlFor="payment-modal" className="btn btn-primary">Pay Now</label></>
					}
				</div>
			</div>
		</div>
	);
}

export default MyOrderCard;