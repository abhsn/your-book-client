function MyOrderCard({ order, setProduct }) {
	console.log(order);
	const { _id, productName, img, resalePrice, buyer } = order;
	return (
		<div className="card card-compact bg-base-100 shadow-xl">
			<figure><img src={img} alt="Shoes" /></figure>
			<div className="card-body">
				<h2 className="card-title">{productName}</h2>
				<p>Price: ${resalePrice}</p>
				<div className="card-actions justify-end">
					{
						buyer.paymentId ?
							<button className="btn" disabled>Paid</button> :
							<><label onClick={() => setProduct(order)} htmlFor="payment-modal" className="btn btn-primary">Pay Now</label></>
					}
				</div>
			</div>
		</div>
	);
}

export default MyOrderCard;