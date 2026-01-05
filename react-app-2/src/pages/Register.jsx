import React, { useState } from 'react'
import { registerUser } from '../services/api'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      // Validate on frontend too
      if (!form.name || !form.name.trim()) {
        setError('Name/Username is required')
        setLoading(false)
        return
      }
      if (!form.email || !form.email.trim()) {
        setError('Email is required')
        setLoading(false)
        return
      }
      if (!form.password || !form.password.trim()) {
        setError('Password is required')
        setLoading(false)
        return
      }
      
      await registerUser({ 
        username: form.name.trim(), 
        email: form.email.trim(), 
        password: form.password 
      })
      setDone(true)
    } catch (err) {
      console.error('Registration error:', err)
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div style={{padding: 40, maxWidth: 500, margin: '0 auto'}}>
      <h2 style={{color: 'green'}}>✓ Registration Successful!</h2>
      <p>Your account has been created. You can now log in.</p>
    </div>
  )

  return (
    <div style={{padding: 40, maxWidth: 500, margin: '0 auto'}}>
      <h2>Create Account</h2>
      {error && (
        <div style={{
          padding: 12, 
          marginBottom: 16, 
          background: '#ffebee', 
          color: '#c62828',
          borderRadius: 4,
          border: '1px solid #ef9a9a'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={submit} style={{display:'grid',gap:12}}>
        <div>
          <label style={{display: 'block', marginBottom: 4, fontWeight: 'bold'}}>
            Name/Username *
          </label>
          <input 
            placeholder="Enter your name" 
            value={form.name} 
            onChange={e=>setForm({...form,name:e.target.value})}
            style={{width: '100%', padding: 8, fontSize: 14}}
            disabled={loading}
          />
        </div>
        <div>
          <label style={{display: 'block', marginBottom: 4, fontWeight: 'bold'}}>
            Email *
          </label>
          <input 
            type="email"
            placeholder="Enter your email" 
            value={form.email} 
            onChange={e=>setForm({...form,email:e.target.value})}
            style={{width: '100%', padding: 8, fontSize: 14}}
            disabled={loading}
          />
        </div>
        <div>
          <label style={{display: 'block', marginBottom: 4, fontWeight: 'bold'}}>
            Password *
          </label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={form.password} 
            onChange={e=>setForm({...form,password:e.target.value})}
            style={{width: '100%', padding: 8, fontSize: 14}}
            disabled={loading}
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: 12, 
            fontSize: 16, 
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
