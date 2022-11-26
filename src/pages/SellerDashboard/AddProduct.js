import { getCategories } from "../../api/serverFetch";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function AddProduct({ setSelected }) {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const { user } = useContext(AuthContext);

	const { data: categories = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories
	})

	const handleForm = data => {
		// console.log(data);
		const product = {
			categoryId: data.categoryId,
			// img : todo
			location: data.location,
			resalePrice: data.resalePrice,
			originalPrice: data.originalPrice,
			purchasedYear: data.purchasedYear,
			productCondition: data.productCondition,
			productName: data.productName,
			sellerName: user.displayName,
			sellerEmail: user.email
		}
		fetch('http://localhost:5000/addItem', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify(product)
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success('Successfully added item');
					setSelected('all');
				} else {
					toast.error('An error occurred');
				}
			})
	}

	return (
		<>
			<div className="hero bg-base-200">
				<div className="hero-content flex-col">
					<div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
						<form onSubmit={handleSubmit(data => handleForm(data))} className="card-body">
							<div className="flex flex-col lg:flex-row lg:gap-2">
								<div className="form-control w-full">
									<label className="label">
										<span className="label-text">Product Name</span>
									</label>
									<input {...register('productName', { required: 'Product Name is required' })} type="text" className="input input-bordered w-full" />
									{
										errors.productName?.message &&
										<label className="label">
											<span className="label-text-alt text-red-500">{errors.productName.message}</span>
										</label>
									}
								</div>
							</div>

							<div className="form-control w-full">
								<label className="label">
									<span className="label-text">Product Image</span>
								</label>
								<input type="file" className="file-input file-input-bordered w-full" />
							</div>

							<div className="flex flex-col lg:flex-row lg:gap-2">
								<div className="form-control">
									<label className="label">
										<span className="label-text">Phone Number</span>
									</label>
									<input {...register('phone', { required: 'Phone number is required', pattern: { value: /^[0-9]+$/, message: 'Please provide a valid phone number' } })} type="text" className="input input-bordered" />
									{
										errors.phone?.message &&
										<label className="label">
											<span className="label-text-alt text-red-500">{errors.phone.message}</span>
										</label>
									}
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text">Location</span>
									</label>
									<input {...register('location', { required: 'Location is required' })} type="text" className="input input-bordered" />
									{
										errors.location?.message &&
										<label className="label">
											<span className="label-text-alt text-red-500">{errors.location.message}</span>
										</label>
									}
								</div>
							</div>

							<div className="flex flex-col lg:flex-row lg:gap-2">
								<div className="form-control lg:w-1/2">
									<label className="label">
										<span className="label-text">Product Condition</span>
									</label>
									<select {...register('productCondition')} className="select select-bordered w-full max-w-xs">
										<option value="Excellent">Excellent</option>
										<option value="Good">Good</option>
										<option value="Fair">Fair</option>
									</select>
								</div>

								<div className="lg:w-1/2">
									<label className="label">
										<span className="label-text">Product Category</span>
									</label>
									<select {...register('categoryId', { required: 'Category is required' })} className="select select-bordered w-full max-w-xs">
										{
											categories.map(category => <option value={category._id}>{category.name}</option>)
										}
										{
											errors.categoryName?.message &&
											<label className="label">
												<span className="label-text-alt text-red-500">{errors.categoryName.message}</span>
											</label>
										}
									</select>
								</div>
							</div>

							<div>
								<label className="label">
									<span className="label-text">Product Details</span>
								</label>
								<textarea {...register('productDetails', { required: 'Location is required' })} className="w-full textarea textarea-bordered"></textarea>
								{
									errors.productDetails?.message &&
									<label className="label">
										<span className="label-text-alt text-red-500">{errors.productDetails.message}</span>
									</label>
								}
							</div>

							<div className="flex flex-col lg:flex-row lg:gap-2">
								<div className="form-control">
									<label className="label">
										<span className="label-text">Original Price</span>
									</label>
									<input {...register('originalPrice', { required: 'Original price is required', pattern: { value: /^[0-9]+$/, message: 'Please provide a valid price' } })} type="number" className="input input-bordered" min='0' />
									{
										errors.originalPrice?.message &&
										<label className="label">
											<span className="label-text-alt text-red-500">{errors.originalPrice.message}</span>
										</label>
									}
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text">Resale Price</span>
									</label>
									<input {...register('resalePrice', { required: 'Resale price is required', pattern: { value: /^[0-9]+$/, message: 'Please provide a valid price' } })} type="number" className="input input-bordered" min='0' />
									{
										errors.resalePrice?.message &&
										<label className="label">
											<span className="label-text-alt text-red-500">{errors.resalePrice.message}</span>
										</label>
									}
								</div>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text">Year of purchase</span>
								</label>
								<input {...register('purchasedYear', { required: 'Year of purchase is required', minLength: { value: 4, message: 'Please provide a valid year' } })} type="number" className="input input-bordered" min='0' />
								{
									errors.purchasedYear?.message &&
									<label className="label">
										<span className="label-text-alt text-red-500">{errors.purchasedYear.message}</span>
									</label>
								}
							</div>

							<div className="form-control mt-6">
								<button className="btn btn-primary">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div >
		</>
	);
}

export default AddProduct;