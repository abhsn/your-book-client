import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { format } from 'date-fns';

function CategoryDetailsCard({ product, setProductName, setPrice, setProductId, setOpenModal }) {
	const { _id, productName, img, location, resalePrice, originalPrice, yearsOfUse, time, sellerName, isSellerVerified } = product;

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
				<span>Years of use: {yearsOfUse}</span>

				{/* time when posted */}
				<span>Post time: {format(new Date(parseInt(time)), 'PP')}</span>

				<div className="card-actions justify-end">
					{/* <button className="btn btn-primary">Book now</button> */}
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