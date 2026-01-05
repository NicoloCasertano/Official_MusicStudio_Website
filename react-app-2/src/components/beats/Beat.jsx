import React, { useContext } from 'react'
import '/Users/mac/Dev_N/React/react-app-2/src/components/beats/Beat.css'
import { CartContext } from '/Users/mac/Dev_N/React/react-app-2/src/context/CartContext'

export default function Beat({ beat }) {
  const { user } = useContext(CartContext) || {}

  const canBuy = !!(user && user.isSubscribed)

  function handleBuy() {
    if (!canBuy) return alert('You must be subscribed and logged in to buy beats.')
    // Hook this up to backend purchase flow
    alert('Purchasing ' + beat.title)
  }

  return (
    <article className="beat-card">
      <div className="beat-info">
        <h4>{beat.title}</h4>
        <p className="price">€{beat.price}</p>
      </div>

      <audio controls src={beat.file ? beat.file : `/media/beats/${beat.fileName || ''}`}>
        Your browser does not support audio.
      </audio>

      <div className="beat-actions">
        <button onClick={handleBuy} disabled={!canBuy}>{canBuy ? 'Buy' : 'Subscribe to buy'}</button>
      </div>
    </article>
  )
}
