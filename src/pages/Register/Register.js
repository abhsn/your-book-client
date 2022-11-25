import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function Register() {
	const { register, handleSubmit, formState: { errors }, setError } = useForm();
	const { signUp, updateUserProfile, setUser } = useContext(AuthContext);
	const [firebaseError, setFirebaseError] = useState('');

	const saveUser = (name, email) => {
		const user = { name, email };
		fetch('http://localhost:5000/users', {
			method: "POST",
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then(res => res.json())
			.then(data => {
				data.acknowledged && toast.success('User created successfully');
				// console.log(data);
			})
	}

	const handleSignUp = (email, password, name) => {
		signUp(email, password)
			.then(result => {
				updateUserProfile(name)
					.then(() => {
						const newUserObj = { ...result.user };
						setUser(newUserObj);
						saveUser(name, email);
					})
			})
			.catch(err => setFirebaseError(err.message))
	}

	return (
		<section className="flex flex-col items-center mt-8">
			<h2 className="font-bold text-3xl">Register</h2>

			{/* form starts here */}
			<div className="hero">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

						<form onSubmit={handleSubmit((data) => {
							// raises error when both password is not same
							data.password !== data.confirm && setError('confirm', { type: 'custom', message: 'Password does not match.' });

							// calls handleSignUp funtion
							handleSignUp(data.email, data.password, data.name)
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