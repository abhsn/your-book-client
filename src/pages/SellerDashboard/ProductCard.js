import { format } from "date-fns";
import toast from "react-hot-toast";

function ProductCard({ product, refetch }) {
	const { _id, productName, resalePrice, img, categoryName, location, time, status } = product;

	function deleteProduct() {
		fetch(`http://localhost:5000/deleteProduct/${_id}`, {
			method: "delete",
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success('Successfully deleted item');
					refetch();
				} else {
					toast.error('An error occurred');
				}
			})
	}

	function advertiseProduct() {
		fetch(`http://localhost:5000/advertiseProduct/${_id}`, {
			method: "POST",
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success('Successfully advertised item');
				} else {
					if (data.message === 'already advertised') {
						toast.error('Already advertised');
					} else {
						toast.error('An error occurred');
					}
				}
			})
	}

	return (
		<div className="card card-compact bg-base-100 shadow-xl">
			<figure><img src={img} alt={productName} className="w-40 h-60 object-cover" /></figure>
			<div className="card-body">
				<h2 className="card-title">{productName}</h2>
				<p>Category: {categoryName}</p>
				<p>Price: ${resalePrice}</p>
				<p>Location: {location}</p>
				<p>Post date: {format(new Date(time), 'PP')}</p>
				{
					status === 'sold' ?
						<div className="card-actions justify-end">
							<button className="btn btn-primary" disabled>Sold</button>
						</div>
						: <div className="card-actions justify-end">
							<label onClick={advertiseProduct} className="btn btn-success">Advertise</label>
							<label onClick={deleteProduct} className="btn btn-error">Delete</label>
						</div>
				}
			</div>
		</div>
	);
}

export default ProductCard;