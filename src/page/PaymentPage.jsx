import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import getData from "../services/GetService";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckOutForm'

const stripePromise = loadStripe("pk_test_51OBCX1Gg5oQ5MXqVVkbm0IGk9vwNN5gU901C8tV6uvOHC9yZ44sGclAlMy9rUALg5nLhnOnL2D2RAWOPvzwX19Uo008TQU6fpS");
const appearance = {
    theme: 'stripe',
  };
function PaymentPage() {    
    useEffect(()=>{
        const payment = async () => {
            try {
              const paymentResult = await getData("Payment");
              setClientSecret(paymentResult);
              console.log(paymentResult);
            } catch (error) {
              console.error("Odeme alinamadi:", error);
            }
          };

          payment();
    },[])

    const [clientSecret, setClientSecret] = useState("");
    const options = {
        clientSecret,
        appearance,
      };      
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default PaymentPage