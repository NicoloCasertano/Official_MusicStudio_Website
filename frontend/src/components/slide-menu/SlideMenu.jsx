import React, { useEffect, useState, useContext } from 'react'
import './SlideMenu.css'
import { login, updateProfile, registerUser } from '../../services/api'
import { MenuContext } from '../../context/MenuContext'
import { useNavigate } from 'react-router-dom'

export default function SlideMenu({ onLoginChange }) {
  const { open, setOpen } = useContext(MenuContext)
  const [isOpen, setIsOpen] = useState(!!open)
  // Initialize user from localStorage if exists
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sa_user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch (e) {
        return null
      }
    }
    return null
  })
  const [form, setForm] = useState({ name: '', email: '', password: '', image: '' })
  const [showRegister, setShowRegister] = useState(false)
  const navigate = useNavigate()

  useEffect(() => setIsOpen(!!open), [open])
  
  // Listen for user changes from other components
  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('sa_user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }
    
    window.addEventListener('storage', checkUser)
    window.addEventListener('userChanged', checkUser)
    
    return () => {
      window.removeEventListener('storage', checkUser)
      window.removeEventListener('userChanged', checkUser)
    }
  }, [])

  useEffect(() => {
    if (user) setForm({ 
      name: user.username || user.name || '', 
      email: user.email || '', 
      image: user.profileImg || user.image || '' 
    })
  }, [user])

  function close() {
    setIsOpen(false)
    setOpen(false)
  }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await login({ email: form.email, password: form.password })
      setUser(res)
      localStorage.setItem('sa_user', JSON.stringify(res))
      onLoginChange && onLoginChange(res)
      setShowRegister(false)
      // Refresh the page to update all components
      window.location.reload()
    } catch (err) {
      console.error('login failed', err)
      alert('Login failed: check email/password')
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const res = await registerUser({ username: form.name || form.email, email: form.email, password: form.password })
      setUser(res)
      localStorage.setItem('sa_user', JSON.stringify(res))
      onLoginChange && onLoginChange(res)
      setShowRegister(false)
      alert('✅ Successful Registration! Welcome to NoSaintz!')
      // Refresh the page to update all components
      window.location.reload()
    } catch (err) {
      console.error('register failed', err)
      alert('❌ Registration failed: ' + err.message)
    }
  }

  async function handleSaveProfile(e) {
    e.preventDefault()
    if (!user) return
    try {
      // Send only changed fields with profileImg instead of image
      const payload = {
        username: form.name,
        email: form.email,
        profileImg: form.image
      }
      const updated = await updateProfile(user.id, payload)
      
      // Update local state with new data
      const updatedUser = { ...updated, name: updated.username }
      setUser(updatedUser)
      localStorage.setItem('sa_user', JSON.stringify(updatedUser))
      onLoginChange && onLoginChange(updatedUser)
      
      alert('✅ Profile updated successfully!')
      
      // Refresh page to update footer
      window.location.reload()
    } catch (err) {
      console.error('update failed', err)
      alert('❌ Failed to update profile: ' + err.message)
    }
  }

  function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setForm(s => ({ ...s, image: reader.result }))
    reader.readAsDataURL(f)
  }

  const canShip = !!(user && user.work_id)

  return (
    <aside className={"slide-menu " + (isOpen ? 'open' : '')} onClick={close}>
      <div className="slide-menu-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={close}>×</button>

        <section className="menu-section">
          <h3>User</h3>
          {user ? (
            // LOGGED IN - Only show logout and profile edit
            <div className="profile-area">
              <div className="profile-preview">
                {form.image ? <img src={form.image} alt="profile" /> : <div className="avatar-placeholder"></div>}
              </div>
              
              <button 
                type="button" 
                className="logout-btn"
                style={{width: '100%', marginBottom: '16px'}}
                onClick={() => {
                  setUser(null)
                  setForm({ name: '', email: '', password: '', image: '' })
                  localStorage.removeItem('sa_user')
                  onLoginChange && onLoginChange(null)
                  window.dispatchEvent(new Event('userChanged'))
                }}
              >
                Log out
              </button>

              <form onSubmit={handleSaveProfile} className="profile-edit-form">
                <h4 style={{marginBottom: '15px', textAlign: 'center', fontSize: '16px'}}>Edit Profile</h4>
                <label>
                  Name
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </label>
                <label>
                  Email
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </label>
                <label>
                  Profile Image
                  <input type="file" accept="image/*" onChange={handleFile} />
                </label>
                <button type="submit" className="save-profile-btn">Save Profile</button>
              </form>
            </div>
          ) : (
            showRegister ? (
              <>
                {user && (
                  <button 
                    type="button" 
                    className="logout-btn"
                    style={{width: '100%', marginBottom: '20px'}}
                    onClick={() => {
                      setUser(null)
                      setForm({ name: '', email: '', password: '', image: '' })
                      localStorage.removeItem('sa_user')
                      onLoginChange && onLoginChange(null)
                      window.dispatchEvent(new Event('userChanged'))
                      setShowRegister(false)
                    }}
                  >
                    Log out
                  </button>
                )}
                <form onSubmit={handleRegister} className="menu-form">
                  <label>
                    Username
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </label>
                  <label>
                    Email
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </label>
                  <label>
                    Password
                    <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                  </label>
                  <button type="submit">Create account</button>
                  <button type="button" onClick={() => setShowRegister(false)}>Back to login</button>
                </form>
              </>
            ) : (
              <form onSubmit={handleLogin} className="menu-form">
                <label>
                  Email
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </label>
                <label>
                  Password
                  <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit">Log in</button>
                  <button type="button" onClick={() => setShowRegister(true)}>Create account</button>
                </div>
              </form>
            )
          )}
        </section>
      </div>
    </aside>
  )
}
