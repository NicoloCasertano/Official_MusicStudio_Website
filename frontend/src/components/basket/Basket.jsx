import React, { useState } from 'react'
import './Basket.css'
import { useCart } from '../../context/CartContext'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { PAYMENT_CONFIG, calculateSplit } from '../../config/payment'
import { purchaseBeatExclusive } from '../../services/api'
const applePayIcon = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/apple_icn.png'
const googlePayIcon = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/googlePay_icn.png'
const payPalIcon = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/payPal_icn.svg'

function downloadText(filename, text){
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const Basket = () => {
  const { items, subtotal, updateQty, removeItem, clear } = useCart()
  const [showInvoices, setShowInvoices] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [user, setUser] = useState(null)

  // Check if user is logged in
  React.useEffect(() => {
    const savedUser = localStorage.getItem('sa_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Failed to parse user', e)
      }
    }
  }, [])

  const splits = calculateSplit(subtotal)

  function handleCheckout(){
    if(items.length===0){ alert('Cart is empty'); return }
    if(!user){ 
      alert('Please log in to complete your purchase'); 
      return 
    }
    if(!selectedPayment){ alert('Please select a payment method'); return }
    
    // If PayPal is selected, open PayPal.me page
    if(selectedPayment === 'paypal'){
      window.open('https://www.paypal.com/paypalme/nicolocasertano', '_blank')
    }
    
    // show invoices with IBANs and allow download
    setShowInvoices(true)
  }

  function handlePaymentSelect(method){
    setSelectedPayment(method)
  }

  async function downloadInvoices(){
    // Notify backend about beat purchases
    const beatPurchases = items.filter(item => item.id && item.bpm) // Beats have bpm field
    
    for (const beat of beatPurchases) {
      try {
        await purchaseBeatExclusive(beat.id, user.email)
        console.log(`Beat ${beat.title} marked as sold`)
      } catch (err) {
        console.error(`Failed to mark beat ${beat.title} as sold:`, err)
      }
    }

    const invoiceNicolo = `
═══════════════════════════════════════════
         INVOICE - ${PAYMENT_CONFIG.recipients.nicolo}
═══════════════════════════════════════════

Payment Method: ${selectedPayment.toUpperCase()}
Total Amount: €${subtotal.toFixed(2)}
Your Share: €${splits.nicolo.toFixed(2)}

IBAN: ${PAYMENT_CONFIG.ibans.nicolo}

Items:
${items.map(item => `  - ${item.title} x${item.qty} = €${(item.price * item.qty).toFixed(2)}${item.bpm ? ' [EXCLUSIVE RIGHTS]' : ''}`).join('\n')}

Thank you for your purchase!
${beatPurchases.length > 0 ? '\n⚠️ Beats purchased with EXCLUSIVE RIGHTS.\nYou now own full rights to these beats.\n' : ''}
═══════════════════════════════════════════
    `
    
    const invoiceAndrea = `
═══════════════════════════════════════════
         INVOICE - ${PAYMENT_CONFIG.recipients.andrea}
═══════════════════════════════════════════

Payment Method: ${selectedPayment.toUpperCase()}
Total Amount: €${subtotal.toFixed(2)}
Your Share: €${splits.andrea.toFixed(2)}

IBAN: ${PAYMENT_CONFIG.ibans.andrea}

Items:
${items.map(item => `  - ${item.title} x${item.qty} = €${(item.price * item.qty).toFixed(2)}${item.bpm ? ' [EXCLUSIVE RIGHTS]' : ''}`).join('\n')}

Thank you for your purchase!
${beatPurchases.length > 0 ? '\n⚠️ Beats purchased with EXCLUSIVE RIGHTS.\nYou now own full rights to these beats.\n' : ''}
═══════════════════════════════════════════
    `
    
    downloadText('invoice-nicolo.txt', invoiceNicolo)
    downloadText('invoice-andrea.txt', invoiceAndrea)
    
    // Clear cart after successful checkout
    setTimeout(() => {
      clear()
      setShowInvoices(false)
      setSelectedPayment(null)
      alert('✅ Success Purchase!\n\nPayment processed successfully! Invoices downloaded.\n' + 
            (beatPurchases.length > 0 ? '\n🎵 Exclusive beats have been removed from the store.\nYou now own full rights!' : ''))
    }, 500)
  }

  return (
    <div>
      <Navbar />
      <div className='basket container'>
      <h1>Basket</h1>
      {!user && items.length > 0 && (
        <div className='auth-warning'>
          <p>⚠️ Please log in to complete your purchase</p>
        </div>
      )}
      {items.length===0 ? (
        <p className='muted'>Your basket is empty.</p>
      ) : (
        <div className='items'>
          {items.map(it => (
            <div className='item' key={it.id}>
              <div className='i-left'>
                <img src={it.image} alt={it.title} />
              </div>
              <div className='i-mid'>
                <div className='title'>{it.title}</div>
                <div className='price'>€{it.price.toFixed(2)}</div>
                <div className='controls'>Qty: <input type='number' value={it.qty} min={1} onChange={e=> updateQty(it.id, Number(e.target.value))} /></div>
              </div>
              <div className='i-right'>
                <div className='sub'>€{(it.price*it.qty).toFixed(2)}</div>
                <button className='btn' onClick={()=> removeItem(it.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className='summary'>
            <div>Subtotal: €{subtotal.toFixed(2)}</div>
          </div>

          <div className='payment-section'>
            <h3 style={{marginTop:'-10vh'}}>Select Payment Method</h3>
            <div className='payment-buttons'>
              <button 
                className={`payment-btn ${selectedPayment === 'applepay' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect('applepay')}
              >
                <img src={applePayIcon} alt="Apple Pay" className='payment-icon' />
                Apple Pay
              </button>

              <button 
                className={`payment-btn ${selectedPayment === 'googlepay' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect('googlepay')}
              >
                <img src={googlePayIcon} alt="Google Pay" className='payment-icon' />
                Google Pay
              </button>

              <button 
                className={`payment-btn ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect('paypal')}
              >
                <img src={payPalIcon} alt="PayPal" className='payment-icon' />
                PayPal
              </button>

              <button 
                className={`payment-btn ${selectedPayment === 'card' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect('card')}
              >
                <svg className='payment-icon' viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2"/>
                  <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2"/>
                </svg>
                Credit/Debit Card
              </button>

              <button 
                className={`payment-btn ${selectedPayment === 'banktransfer' ? 'selected' : ''}`}
                onClick={() => handlePaymentSelect('banktransfer')}
              >
                <svg className='payment-icon' viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2"/>
                  <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2"/>
                </svg>
                Bank Transfer
              </button>
            </div>
          </div>

          <div className='checkout-actions'>
            <button className='btn checkout-btn' onClick={handleCheckout}>Checkout</button>
            <button className='btn alt' onClick={()=> clear()}>Clear Cart</button>
          </div>
        </div>
      )}

      {showInvoices && (
        <div className='invoices'>
          <h2>Payment Summary - {selectedPayment.toUpperCase()}</h2>
          <p className='payment-note'>Total will be split between two recipients:</p>
          <div className='invoice-card'>
            <div className='who'>{PAYMENT_CONFIG.recipients.nicolo}</div>
            <div>IBAN: {PAYMENT_CONFIG.ibans.nicolo}</div>
            <div>Amount: €{splits.nicolo.toFixed(2)}</div>
          </div>
          <div className='invoice-card'>
            <div className='who'>{PAYMENT_CONFIG.recipients.andrea}</div>
            <div>IBAN: {PAYMENT_CONFIG.ibans.andrea}</div>
            <div>Amount: €{splits.andrea.toFixed(2)}</div>
          </div>
          <div className='invoice-actions'>
            <button className='btn' onClick={downloadInvoices}>Complete Payment & Download Invoices</button>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  )
}

export default Basket
