import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProccessingPayment, setIsProccessingPayment] = useState(false)

    console.log('currentuser is  -> ', currentUser)
    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
          return;
        }

        if(!stripe || !elements) {return;}

        setIsProccessingPayment(true);
        
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount:amount * 100 }),
        }).then(res => { return res.json()});
        // console.log(response);
        const {paymentIntent: {client_secret}} = response;
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: currentUser ? currentUser.displayName : 'Guest',
              },
            },
          });

        setIsProccessingPayment(false);

       if (paymentResult.error){
           alert(paymentResult.error); 
           console.log('Payment Failure')
       }else{
        if(paymentResult.paymentIntent.status === 'succeeded'){
            alert('Payment successfull')
        }
       }
    }
   
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2> Credit Card Payment:  </h2>
                <CardElement />
                <PaymentButton 
                  isLoading={isProccessingPayment} 
                  buttonType={BUTTON_TYPE_CLASSES.inverted}> 
                    Pay now 
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;