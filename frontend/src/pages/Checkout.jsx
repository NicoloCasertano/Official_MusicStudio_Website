import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  window?.__env?.REACT_APP_STRIPE_PUBLISHABLE
)

function StripeForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  async function pay(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5713/api'
      const res = await fetch(`${API_BASE}/payments/create-intent`, { 
        method: 'POST', 
        headers: {'content-type':'application/json'}, 
        body: JSON.stringify({ amount: 1999, currency: 'usd' }) 
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to create payment intent')
      }
      
      const { clientSecret } = await res.json()
      const card = elements.getElement(CardElement)
      const result = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } })
      
      if (result.error) {
        alert('Payment failed: ' + result.error.message)
      } else {
        alert('Payment succeeded!')
      }
    } catch (err) {
      console.error('Payment error:', err)
      alert('Payment error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={pay} style={{maxWidth:420}}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} style={{marginTop:12}}>Pay $19.99</button>
    </form>
  )
}

export default function Checkout() {
  const [paypalClientId] = useState(
    import.meta.env.VITE_PAYPAL_CLIENT_ID || 
    window?.__env?.REACT_APP_PAYPAL_CLIENT_ID
  )
  return (
    <div style={{padding:20}}>
      <h2>Checkout</h2>
      <div style={{display:'grid',gap:12,maxWidth:720}}>
        <Elements stripe={stripePromise}>
          <StripeForm />
        </Elements>

        <div>
          <h4>PayPal</h4>
          <PayPalScriptProvider options={{"client-id": paypalClientId || 'test'}}>
            <PayPalButtons style={{layout:'vertical'}} createOrder={(data, actions) => {
              return actions.order.create({ purchase_units: [{ amount: { value: '19.99' } }] })
            }} onApprove={async (data, actions) => {
              await actions.order.capture()
              alert('PayPal payment captured')
            }} />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  )
}
