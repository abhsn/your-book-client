import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function BookingModal({ user, productName, price, productId }) {

	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			username: user.displayName,
			email: user.email,
			itemName: productName,
			itemPrice: price
		}
	});

	const handleFetch = (data) => {
		const buyerDetails = {
			phone: data.phone,
			location: data.location,
			username: user.displayName,
			email: user.email
		}
		const editedProduct = {
			productId,
			buyerDetails
		}
		fetch('http://localhost:5000/booking', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(editedProduct)
		})
			.then(res => res.json())
			.then(data => {
				data.success ? toast.success('Successfully booked item') : toast.error('An error occured')
			})

	}

	return (
		<>
			<input type="checkbox" id="booking-modal" className="modal-toggle" />

			<div className="modal">
				<div className="modal-box relative">
					{/* modal close button */}
					<label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					{/* modal title */}
					<h3 className="text-lg font-bold">Please fill the form to buy this item</h3>
					{/* modal form */}
					<form className="mt-2 flex flex-col gap-4" onSubmit={handleSubmit(data => {
						handleFetch(data);
					})}>
						{/* user's display name */}
						<div>
							<label htmlFor="username">User Name</label>
							<input {...register('username')} id="username" type="text" className="input input-bordered w-full" value={user.displayName} disabled />
						</div>

						{/* user's email */}
						<div>
							<label htmlFor="email">Email</label>
							<input {...register('email')} id="email" type="text" className="input input-bordered w-full" value={user.email} disabled />
						</div>

						{/* product's name */}
						<div>
							<label htmlFor="itemName">Product Name</label>
							<input {...register('itemName')} id="itemName" type="text" className="input input-bordered w-full" value={productName} disabled />
						</div>

						{/* product price */}
						<div>
							<label htmlFor="itemPrice">Price</label>
							<input {...register('itemPrice')} id="itemPrice" type="text" className="input input-bordered w-full" value={`$ ${price}`} disabled />
						</div>

						{/* buyer phone number */}
						<div>
							<label htmlFor="phone">Phone</label>
							<input {...register('phone', { required: 'Please provide a phone number', pattern: { value: /^[0-9]+$/, message: 'Please provide a valid phone number' } })} id="phone" type="text" className="input input-bordered w-full" />
							{
								errors.phone?.message && <small className="text-red-500">{errors.phone.message}</small>
							}
						</div>

						{/* meetup location */}
						<div>
							<label htmlFor="location">Location</label>
							<input {...register('location', { required: 'Please provide a location' })} id="location" type="text" className="input input-bordered w-full" />
							{
								errors.location?.message && <small className="text-red-500">{errors.location.message}</small>
							}
						</div>

						{/* submit button */}
						<div>
							<input className="btn btn-primary" type="submit" value="Submit" />
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default BookingModal;