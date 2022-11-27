import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';

function AdvertisedItem({ advertise, setProductName, setPrice, setProductId, setOpenModal, user }) {
	const { img, productName, sellerName, isSellerVerified, location, resalePrice, originalPrice, purchasedYear, time, _id } = advertise;

	return (
		<div>
			<div className="card card-compact bg-base-100 shadow-xl">
				<figure><img src={img} alt={productName} className="w-80 lg:w-96 h-40 object-cover" /></figure>
				<div className="card-body">
					<h2 className="card-title">{productName}</h2>
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

					{/* time when posted */}
					<span>Post time: {format(new Date(parseInt(time)), 'PP')}</span>

					<div className="card-actions justify-end">
						<label htmlFor="booking-modal" className="btn btn-primary" onClick={() => {
							setProductName(productName);
							setPrice(resalePrice);
							setProductId(_id);
							setOpenModal(true);
							if (!user?.email) {
								toast.error('Please login to book')
							}
						}}>Book now</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdvertisedItem;