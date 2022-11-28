import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { BsGoogle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getJWT } from "../../api/serverFetch";
import setTitle from "../../utils/setTitle";

function Login() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const { signIn, googleSignIn } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";

	setTitle('Login');

	// firebase error
	const [error, setError] = useState('');

	const logIn = (email, password) => {
		setError('');
		signIn(email, password)
			.then(result => {
				fetch(`https://b612-used-products-resale-server-side-abhsn.vercel.app/jwt?email=${result.user.email}`)
					.then(res => res.json())
					.then(data => {
						if (data.accessToken) {
							localStorage.setItem('accessToken', data.accessToken);
							navigate(from, { replace: true });
						} else {
							toast.error('An error occurred');
						}
					});
			})
			.catch(err => setError(err.message))
	}

	const loginWithGoogle = () => {
		setError('');
		googleSignIn()
			.then(result => {
				const user = result.user;
				const newUser = { name: user.displayName, email: user.email, userType: 'buyer' };

				fetch('https://b612-used-products-resale-server-side-abhsn.vercel.app/users', {
					method: "POST",
					headers: {
						'content-type': 'application/json',
						'authorization': `Bearer ${localStorage.getItem('accessToken')}`
					},
					body: JSON.stringify(newUser)
				})
					.then(res => res.json())
					.then(async data => {
						const jwt = await getJWT(user.email);
						localStorage.setItem('accessToken', jwt.accessToken);
						if (jwt.accessToken) {
							toast.success('Logged in successfully');
						} else {
							toast.error('An error occurred');
						}
					})
			})
			.catch(err => setError(err.message))
	}

	return (
		<section className="flex flex-col items-center my-10">
			<h2 className="font-bold text-3xl">Login</h2>

			{/* form starts here */}
			<div className="hero">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<form onSubmit={handleSubmit((data) => {
							logIn(data.email, data.password);
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
								<label className="label">
									<a href="#" className="label-text-alt link link-hover">Forgot password?</a>
								</label>
							</div>

							{/* shows firebase error */}
							{
								error && <span className="text-center text-red-500"><small>{error}</small></span>
							}

							{/* login button */}
							<div className="form-control mt-6">
								<button className="btn btn-primary">Login</button>
							</div>

							<div className="divider">OR</div>

							{/* login with google button */}
							<div className="form-control">
								<button onClick={e => {
									e.preventDefault();
									loginWithGoogle();
								}} className="btn btn-outline flex gap-3"><span className="text-xl"><BsGoogle /></span>Sign in with Google</button>
							</div>
							<div className="form-control text-center">
								<span>
									<small>Don't have an account? Create{" "}
										<span className="underline"><Link to="/register">here</Link></span>.
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

export default Login