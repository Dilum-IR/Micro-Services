import React, {useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {Axios_payments, Axios_packages} from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
import {useSelector} from 'react-redux';
const CARD_OPTIONS = {
	iconStyle: 'solid',
	style: {
		base: {
			iconColor: '#e6e9ec',
			color: '#deded5',
			fontWeight: 500,
			fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
			fontSize: '16px',
			fontSmoothing: 'antialiased',
			':-webkit-autofill': {color: '#4b4105'},
			'::placeholder': {color: '#e6e9ec'},
		},
		invalid: {
			iconColor: '#ffc7ee',
			color: '#ffc7ee',
		},
	},
};
export default function PaymentForm(props) {
	const userid = useSelector((state) => state.UserReducer.userid);
	const amount = props.amount * 100;
	const p_id = props.id;
	console.log(userid)
	const [success, setSuccess] = useState('');
	const stripe = useStripe();
	const elements = useElements();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const {error, paymentMethod} = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		if (!error) {
			try {
				const {id} = paymentMethod;
				Axios_payments.post(API_ENDPOINTS.PAYMENT, {
					amount: amount,
					id: id,
				}).then((response) => {
					console.log(response);
					if (response.data == 'success') {
						Axios_packages.post(API_ENDPOINTS.ACTIVATE_PACKAGE, {
							user: userid,
							id: p_id,
						}).then((response_2) => {
							console.log(response_2);
						});
						setSuccess(true);
					}
				});
				//console.log(response)
			} catch (error) {
				console.log('Error', error);
			}
		} else {
			console.log(error.message);
		}
	};

	return (
		<>
			{!success ? (
				<form onSubmit={handleSubmit}>
					<fieldset className='FormGroup'>
						<div className='FormRow'>
							<CardElement options={CARD_OPTIONS} />
						</div>
					</fieldset>
					<div style={
						{
							width: '80%',
							height: '120%',
							paddingLeft: '45%',
							borderRadius:'10px'
						}
					}>
						<button
							style={{
								width: '15%',
								height: '40%',
								backgroundColor: '#009879',
								outline: '3px solid white',
								color: 'white',
								fontSize:'1.3em',
								fontWeight:'bold',
								borderRadius:'10px',
								borderColor:'#b5b9b6',
								cursor:'pointer'
							}}
						>
							Pay
						</button>
					</div>

				</form>
			) : (
				<div>
					<h2>Payment success</h2>
				</div>
			)}
		</>
	);
}
