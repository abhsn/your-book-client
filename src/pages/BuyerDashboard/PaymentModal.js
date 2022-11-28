import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function PaymentModal({ product, setPayment, refetch }) {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useContext(AuthContext);

	// if (loading) {
	// 	document.body.style.cursor = 'not-allowed';
	// }
	// if (!loading) {
	// 	document.body.style.cursor = 'auto';
	// }

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card == null) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			setError(error);
		} else {
			setError('');
			setLoading(true);
			document.body.style.cursor = 'not-allowed';
			const response = await axios.post(`https://b612-used-products-resale-server-side-abhsn.vercel.app/payment/${product._id}`, {
				id: paymentMethod.id,
				email: user.email
			}, {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			});

			if (response.data.success) {
				toast.success(`Your payment was successful and your payment id is ${response.data.paymentId}`);
				e.target.reset();
				setLoading(false);
				document.body.style.cursor = 'auto';
				setPayment(false);
				refetch();
			} else {
				if (response.data.message === 'already bought') {
					toast.error('Someone already bought this item. Better luck next time.');
					document.body.style.cursor = 'auto';
					setLoading(false);
				} else {
					toast.error('An error occurred');
					document.body.style.cursor = 'auto';
					setLoading(false);
				}
			}

			if (response.data.message === 'unauthorized access') {
				document.body.style.cursor = 'auto';
				toast.error('An error occurred. Please try to log out and log in back.');
				setLoading(false);
			}
		}
	};


	return (
		<>
			<input type="checkbox" id="payment-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label htmlFor="payment-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 className="text-lg font-bold">Payment details</h3>
					<p className="mt-3">Product Name: {product.productName}</p>
					<p>Price: ${product.resalePrice}</p>

					<form onSubmit={handleSubmit} className="mt-3">
						<CardElement
							options={{
								style: {
									base: {
										fontSize: '16px',
										color: '#424770',
										'::placeholder': {
											color: '#aab7c4',
										},
									},
									invalid: {
										color: '#9e2146',
									},
								},
							}}
						/>
						{error && <label className="label text-sm text-red-500">{error.message}</label>}
						<button className="flex btn btn-primary btn-sm mt-2" type="submit" disabled={!stripe || loading}>
							Pay
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default PaymentModal;