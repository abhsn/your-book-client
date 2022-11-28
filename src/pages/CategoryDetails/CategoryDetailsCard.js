import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { format } from 'date-fns';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import toast from 'react-hot-toast';

function CategoryDetailsCard({ product, setProductName, setPrice, setProductId, setOpenModal, refetch }) {
	const { _id, productName, img, location, resalePrice, originalPrice, purchasedYear, time, sellerName, isSellerVerified, productCondition, reported } = product;

	let reportedArray = '';
	if (typeof reported === 'object') {
		reportedArray = [...reported];
	}

	const { user } = useContext(AuthContext);

	const reportToAdmin = () => {
		const reportDetails = {
			email: user.email,
			productId: _id
		}
		fetch('http://localhost:5000/reportToAdmin/', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				"content-type": "application/json"
			},
			body: JSON.stringify(reportDetails)
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if (data.success) {
					toast.success('Successfully reported to admin');
				} else {
					toast.error('An error occurred');
				}
			})
	}

	return (
		// product details card
		<div className="card card-compact w-96 bg-base-100 shadow-xl">
			<figure><img src={img} className="h-64" alt={productName} /></figure>
			<div className="card-body">

				{/* product name */}
				<h3 className="card-title">Product: {productName}</h3>

				{/* shows user information */}
				<div className='flex items-center gap-3'>
					<span className='font-bold text-xl'>Seller: {sellerName}</span>
					{/* shows blue tick on verified user */}
					{isSellerVerified && <span className='text-blue-500 text-xl'><GoVerified /></span>}
				</div>

				{/* user location */}
				<span className='flex items-center gap-2'><FaMapMarkerAlt />{location}</span>

				{/* prices */}
				<span>Resale price: ${resalePrice}</span>
				<span>Original price: ${originalPrice}</span>

				{/* usage years */}
				<span>Years of use: {new Date().getFullYear() - purchasedYear}</span>

				{/* product condition */}
				<span>Condition: {productCondition}</span>

				{/* time when posted */}
				<span>Post time: {format(new Date(parseInt(time)), 'PP')}</span>

				<div className="card-actions justify-end mt-2">
					{/* <button className="btn btn-primary">Book now</button> */}
					{
						!reportedArray.includes(user.email) && <button onClick={() => {
							reportToAdmin();
							refetch();
						}} className='btn btn-error'>Report to admin</button>
					}

					{
						reportedArray.includes(user.email) && <button onClick={reportToAdmin} className='btn btn-error' disabled>Already reported</button>
					}

					<label htmlFor="booking-modal" className="btn btn-primary" onClick={() => {
						setProductName(productName);
						setPrice(resalePrice);
						setProductId(_id);
						setOpenModal(true);
					}}>Book now</label>
				</div>
			</div>
		</div >
	);
}

export default CategoryDetailsCard;