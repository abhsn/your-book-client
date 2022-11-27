import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getJWT } from "../../api/serverFetch";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function Register() {
	const { register, handleSubmit, formState: { errors }, setError } = useForm();
	const { signUp, updateUserProfile, setUser } = useContext(AuthContext);
	const [firebaseError, setFirebaseError] = useState('');
	const [buyer, setBuyer] = useState(true);

	const saveUser = (name, email, userType) => {
		const user = { name, email, userType };
		fetch('http://localhost:5000/users', {
			method: "POST",
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify(user)
		})
			.then(res => res.json())
			.then(async data => {
				let jwt = '';
				if (data.acknowledged) {
					jwt = await getJWT(email);
					localStorage.setItem('accessToken', jwt.accessToken);
					if (jwt.accessToken) {
						toast.success('User created successfully');
					} else {
						toast.error('An error occurred');
					}
				} else {
					toast.error('An error occurred');
				}
			})
	}

	const handleSignUp = (email, password, name, userType) => {
		setFirebaseError('');
		signUp(email, password)
			.then(result => {
				updateUserProfile(name)
					.then(() => {
						const newUserObj = { ...result.user };
						setUser(newUserObj);
						saveUser(name, email, userType);
					})
			})
			.catch(err => setFirebaseError(err.message))
	}

	return (
		<section className="flex flex-col items-center my-10">
			<h2 className="font-bold text-3xl">Register</h2>

			{/* form starts here */}
			<div className="hero">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

						<form onSubmit={handleSubmit((data) => {
							// raises error when both password is not same
							data.password !== data.confirm && setError('confirm', { type: 'custom', message: 'Password does not match.' });

							// calls handleSignUp funtion
							handleSignUp(data.email, data.password, data.name, data.userType)
						})} className="card-body">

							{/* email input field */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input {...register('email', { required: 'Email is required' })} type="email" className="input input-bordered" />
								{
									errors.email?.message &&
									<label className="label">
										<span className="label-text-alt text-red-500">{errors.email.message}</span>
									</label>
								}
							</div>

							{/* email input field */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input {...register('name', { required: 'Name is required' })} type="text" className="input input-bordered" />
								{
									errors.name?.message &&
									<label className="label">
										<span className="label-text-alt text-red-500">{errors.name.message}</span>
									</label>
								}
							</div>

							{/* password input field */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input {...register('password',
									{
										required: 'Password is required',
										minLength: {
											value: 6,
											message: "Password must be at least six characters long"
										}
									})} type="password" className="input input-bordered" />
								{
									errors.password?.message &&
									<label className="label">
										<span className="label-text-alt text-red-500">{errors.password.message}</span>
									</label>
								}
							</div>

							{/* confirm password field */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">Confirm Password</span>
								</label>
								<input {...register('confirm',
									{
										required: 'Confirm Password is required',
										minLength: {
											value: 6,
											message: "Password must be at least six characters long"
										}
									})} type="password" className="input input-bordered" />
								{
									errors.confirm?.message &&
									<label className="label">
										<span className="label-text-alt text-red-500">{errors.confirm.message}</span>
									</label>
								}
							</div>

							{/* account type option */}
							<div>
								<label htmlFor="account-type" className="label">What type of account do you want to create?</label>
								<div id="account-type" className="flex gap-8">
									<div className="flex items-center gap-2">
										<input {...register('userType')} id="buyer" type="radio" className="radio" value={'buyer'} defaultChecked={buyer} onClick={() => setBuyer(true)} />
										<label className="label" htmlFor="buyer">Buyer</label>
									</div>
									<div className="flex items-center gap-2">
										<input {...register('userType')} id="seller" type="radio" className="radio" value={'seller'} defaultChecked={!buyer} onClick={() => setBuyer(false)} />
										<label className="label" htmlFor="seller">Seller</label>
									</div>
								</div>
							</div>

							{/* shows firebase error */}
							{
								firebaseError &&
								<span className="text-center text-red-500"><small>{firebaseError}</small></span>
							}

							{/* login button */}
							<div className="form-control mt-6">
								<button className="btn btn-primary">Register</button>
							</div>

							<div className="form-control text-center">
								<span>
									<small>Already have an account? Login{" "}
										<span className="underline"><Link to="/login">here</Link></span>.
									</small>
								</span>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Register;