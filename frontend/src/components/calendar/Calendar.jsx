import React, { useEffect, useState } from 'react'
import './Calendar.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import calendarIcon from '../../assets/calendar_icn.png'
import { FaMicrophone } from 'react-icons/fa6'

// Vite env vars: VITE_GOOGLE_API_KEY and VITE_GOOGLE_CALENDAR_ID
const API_KEY = 'AIzaSyDGNhhC3Med0jmuL9l_aooyIuBy0kbnZ94'
const CALENDAR_ID = 'info.nosaintz@gmail.com'

function formatDate(d){
  return d.toISOString().slice(0,10)
}

const defaultSlots = ["15.00", "17.30"]

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [unavailable, setUnavailable] = useState(new Set())
  const [days, setDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(defaultSlots[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sessionType, setSessionType] = useState('recording')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationData, setConfirmationData] = useState(null)

  useEffect(()=>{
    // build next 30 days
    const arr = []
    const today = new Date()
    for(let i=0;i<30;i++){
      const d = new Date(today)
      d.setDate(today.getDate()+i)
      arr.push(d)
    }
    setDays(arr)
  },[])

  useEffect(()=>{
    async function fetchEvents(){
      if(!API_KEY || !CALENDAR_ID){
        // no api key -> skip fetch
        return
      }
      setLoading(true)
      setError(null)
      try{
        const timeMin = new Date().toISOString()
        const timeMax = new Date()
        timeMax.setDate(timeMax.getDate()+60)
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax.toISOString())}&key=${API_KEY}`
        const res = await fetch(url)
        if(!res.ok) {
          console.warn('Google Calendar API returned error:', res.status)
          // Continue without events - calendar might not be public
          setEvents([])
        } else {
          const data = await res.json()
          setEvents(data.items||[])
        }
      }catch(e){
        console.warn('Google Calendar API error:', e.message)
        setError(null) // Don't show error to user, just use empty events
        setEvents([])
      }finally{setLoading(false)}
    }
    fetchEvents()
  },[])

  useEffect(()=>{
    // compute unavailable dates from events
    const s = new Set()
    events.forEach(ev=>{
      const st = ev.start?.date || ev.start?.dateTime
      if(st){
        const d = new Date(st)
        s.add(formatDate(d))
      }
    })
    setUnavailable(s)
  },[events])

  function isUnavailable(d){
    return unavailable.has(formatDate(d))
  }

  // Validation function
  function validateForm() {
    if (!selectedDate) {
      alert('Please select a date')
      return false
    }
    if (!name.trim()) {
      alert('Please enter your name')
      return false
    }
    if (!email.trim()) {
      alert('Please enter your email')
      return false
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return false
    }
    return true
  }

  async function submitBooking(e){
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const dateStr = formatDate(selectedDate)
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateStr,
          time: selectedTime,
          name: name,
          email: email,
          phone: phone,
          sessionType: sessionType,
          notes: notes
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to create booking')
      }
      
      const data = await response.json()
      
      // Show confirmation modal instead of alert
      setConfirmationData({
        date: dateStr,
        time: selectedTime,
        name: name,
        email: email,
        phone: phone,
        sessionType: sessionType,
        notes: notes
      })
      setShowConfirmation(true)
      
      // Reset form
      setName('')
      setEmail('')
      setPhone('')
      setNotes('')
      setSessionType('recording')
      setSelectedDate(null)
      setSelectedTime(defaultSlots[0])
      
    } catch (err) {
      setError(err.message)
      alert('There was an error processing your booking. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  function closeConfirmation() {
    setShowConfirmation(false)
    setConfirmationData(null)
  }

  // Check if a date has events (is booked) based on Google Calendar
  function isUnavailable(d){
    // Check if date is in the past
    const today = new Date()
    today.setHours(0,0,0,0)
    if(d<today) return true
    
    // Check if there are events on this date from Google Calendar
    if (events && events.length > 0) {
      const dateStr = d.toISOString().split('T')[0]
      const hasEvent = events.some(event => {
        const eventStart = event.start?.dateTime || event.start?.date
        if (!eventStart) return false
        const eventDateStr = eventStart.split('T')[0]
        return eventDateStr === dateStr
      })
      if (hasEvent) return true
    }
    
    return false
  }
  
  // Get available time slots for a specific date based on Google Calendar events
  function getAvailableTimeSlotsForDate(date) {
    if (!date || !events || events.length === 0) return defaultSlots
    
    const dateStr = date.toISOString().split('T')[0]
    
    // Get all events for this specific date
    const dayEvents = events.filter(event => {
      const eventStart = event.start?.dateTime || event.start?.date
      if (!eventStart) return false
      const eventDateStr = eventStart.split('T')[0]
      return eventDateStr === dateStr
    })
    
    // Get booked time slots
    const bookedSlots = dayEvents.map(event => {
      const eventStart = event.start?.dateTime
      if (!eventStart) return null
      const time = new Date(eventStart)
      const hours = time.getHours().toString().padStart(2, '0')
      const minutes = time.getMinutes().toString().padStart(2, '0')
      return `${hours}.${minutes}`
    }).filter(Boolean)
    
    // Filter out booked slots
    return defaultSlots.filter(slot => !bookedSlots.includes(slot))
  }

  const availableDates = days.filter(d=>!isUnavailable(d))

  // Get the current month name for display
  const getCurrentMonthName = () => {
    if (days.length === 0) return ''
    const firstDay = days[0]
    return firstDay.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }).toUpperCase();
  }

  return (
    <div>
      <Navbar />
      <div className="calendar-page container">
        <h1>Book a session</h1>
        
        <div style={{ textAlign: 'center', margin: '2rem 0', padding: '2rem', background: '#1a1a1a', borderRadius: '12px', border: '2px solid #808080' }}>
          <h3 style={{ color: '#ffffffcd', marginBottom: '1rem', fontSize: '1.25rem'}}>Quick Booking</h3>
          <p className="muted" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
            Book your session instantly with Google Calendar
          </p>
          <a 
            href="https://calendar.app.google/TC4YhYnEPFBb5F6F7" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              background: '#808080',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(128, 128, 128, 0.4)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#999999';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(128, 128, 128, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#808080';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(128, 128, 128, 0.4)';
            }}
          >
            <img src={calendarIcon} alt="Calendar" className="calendar-button-icon" />
            Book on Google Calendar
          </a>
        </div>
        
        <div style={{ margin: '3rem 0', borderTop: '2px solid #333', paddingTop: '2rem', textAlign: 'center' }}>
          <h3 style={{ color: '#999', fontSize: '1rem', marginBottom: '1rem' }}>
            Or use the booking form below
          </h3>
          <p className="muted" style={{ marginBottom: '2rem', fontSize:'0.75rem' }}>
            ✉️ We'll send confirmation emails to both you and our studio
          </p>
        </div>

      <h3 style={{ marginTop: '100px', fontSize: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{getCurrentMonthName()}</h3>
      <p className="muted" style={{ textAlign: 'center' }}>Select your preferred date and time below</p>
      <div className="days-grid">
        {days.map((d,i)=>(
          <button key={i}
            className={`day ${isUnavailable(d)?'unavailable':'available'} ${selectedDate && formatDate(selectedDate)===formatDate(d)?'selected':''}`}
            onClick={()=>!isUnavailable(d) && setSelectedDate(d)}
            disabled={isUnavailable(d)}
          >
            <div className="dow">{d.toLocaleDateString(undefined,{weekday:'short'})}</div>
            <div className="dom">{d.getDate()}</div>
            <span className={`availability-indicator ${isUnavailable(d) ? 'unavailable-dot' : 'available-dot'}`}></span>
          </button>
        ))}
      </div>

      <div className="legend">
        <span className="dot available"></span> Available
        <span className="dot unavailable"></span> Booked / Unavailable
      </div>

      <div className="booking-panel">
        <h2>Selected</h2>
        <div className="selected-info">
          <div>Date: {selectedDate? selectedDate.toDateString() : '—'}</div>
          <div>
            Time: 
            <select value={selectedTime} onChange={e=>setSelectedTime(e.target.value)}>
              {selectedDate ? 
                getAvailableTimeSlotsForDate(selectedDate).map(s=> <option key={s} value={s}>{s}</option>)
                :
                defaultSlots.map(s=> <option key={s} value={s}>{s}</option>)
              }
            </select>
            {selectedDate && getAvailableTimeSlotsForDate(selectedDate).length === 0 && (
              <span style={{ color: '#ff5c5c', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                No slots available
              </span>
            )}
          </div>
        </div>

        <form className="booking-form" onSubmit={submitBooking}>
          <label htmlFor="name">Name *</label>
          <input id="name" type="text" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)} required />
          
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" type="tel" placeholder="+39 123 456 7890" value={phone} onChange={e=>setPhone(e.target.value)} />
          
          <label htmlFor="sessionType">Session Type *</label>
          <select id="sessionType" value={sessionType} onChange={e=>setSessionType(e.target.value)} required>
            <option value="recording"> Recording Session</option>
            <option value="production"> Production Session</option>
            <option value="consultation"> Consultation</option>
            <option value="other"> Other</option>
          </select>
          
          <label htmlFor="notes">Additional Notes (optional)</label>
          <textarea 
            id="notes"
            value={notes} 
            onChange={e=>setNotes(e.target.value)} 
            placeholder="Any special requests or information we should know..."
            rows="4"
          />
          
          <button className="btn" type="submit" disabled={loading}>
            {loading ? '⏳ Processing...' : '✉️ Request Booking'}
          </button>
        </form>
      </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmation && confirmationData && (
        <div className="modal-overlay" onClick={closeConfirmation}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✅ Booking Confirmed!</h2>
              <button className="modal-close" onClick={closeConfirmation}>×</button>
            </div>
            <div className="modal-body">
              <p className="success-message">Your booking request has been submitted successfully!</p>
              <div className="booking-details">
                <h3>📋 Booking Details:</h3>
                <div className="detail-row">
                  <span className="detail-label">📅 Date:</span>
                  <span className="detail-value">{confirmationData.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">⏰ Time:</span>
                  <span className="detail-value">{confirmationData.time}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">👤 Name:</span>
                  <span className="detail-value">{confirmationData.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">📧 Email:</span>
                  <span className="detail-value">{confirmationData.email}</span>
                </div>
                {confirmationData.phone && (
                  <div className="detail-row">
                    <span className="detail-label">📱 Phone:</span>
                    <span className="detail-value">{confirmationData.phone}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">🎵 Session Type:</span>
                  <span className="detail-value" style={{textTransform: 'capitalize'}}>{confirmationData.sessionType}</span>
                </div>
                {confirmationData.notes && (
                  <div className="detail-row">
                    <span className="detail-label">📝 Notes:</span>
                    <span className="detail-value">{confirmationData.notes}</span>
                  </div>
                )}
              </div>
              <div className="next-steps">
                <h4>🎯 What's Next?</h4>
                <ul>
                  <li>✉️ Check your email inbox for confirmation</li>
                  <li>📧 A notification has been sent to info.nosaintz@gmail.com</li>
                  <li>⏳ We'll get back to you within 24 hours</li>
                  <li>📅 The session will be added to our calendar</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={closeConfirmation}>Got it, thanks!</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Calendar
