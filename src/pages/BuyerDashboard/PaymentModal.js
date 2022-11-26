import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

function PaymentModal({ product }) {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	if (loading) {
		document.body.style.cursor = 'not-allowed';
	}
	if (!loading) {
		document.body.style.cursor = 'auto';
	}

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
			const response = await axios.post(`http://localhost:5000/payment/${product._id}`, {
				id: paymentMethod.id
			});

			if (response.data.success) {
				toast.success(`Your payment was successful and your payment id is ${response.data.paymentId}`);
				e.target.reset();
				setLoading(false);
			} else {
				toast.error('An error occurred');
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