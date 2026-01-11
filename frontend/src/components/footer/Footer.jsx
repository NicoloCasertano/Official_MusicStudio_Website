import React, { useState, useEffect } from 'react'
import './Footer.css'
import { FaInstagram, FaMailBulk, FaSpotify, FaWhatsapp, FaUser } from 'react-icons/fa'
import { PiPhone } from 'react-icons/pi'
import { FaFacebook } from 'react-icons/fa6'

const Footer = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('sa_user')
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser)
          setUser(parsed)
        } catch (e) {
          console.error('Failed to parse user', e)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    // Check initially
    checkUser()

    // Listen for storage changes and custom events
    const handleStorageChange = () => checkUser()
    const handleUserChange = () => checkUser()

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userChanged', handleUserChange)
    
    // Poll every second to catch logout immediately
    const interval = setInterval(checkUser, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userChanged', handleUserChange)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('sa_user')
    setUser(null)
    window.dispatchEvent(new Event('userChanged'))
    window.location.reload()
  }

  return (
    <footer className={user && user.username ? 'has-user' : ''}>
        {user && user.username ? (
          <>
            <div className="footer-user-profile">
              {user.profileImg ? (
                <img src={user.profileImg} alt="Profile" className="footer-profile-img" />
              ) : (
                <div className="footer-profile-placeholder">
                  <FaUser />
                </div>
              )}
              <span className="footer-username">{user.username || user.name}</span>
              <button onClick={handleLogout} className="footer-logout-btn">Log Out</button>
            </div>
            <ul>
                <li><a href="https://open.spotify.com/playlist/6Pa1vPI5eSME4VjJwM6RUI?si=bf624aa848754889" target='_blank'><FaSpotify className='icn-s'/></a> Spotify</li>
                <li><a href="https://www.facebook.com/youneednosaintz" target='_blank'><FaFacebook className='icn-i'/></a> Facebook</li>                
                <li><a href="mailto:info.nosaintz@gmail.com" target='_blank'><FaMailBulk className='icn-m'/></a> Mail</li>
                <li><a href="https://wa.me/393299760718" target='_blank'><FaWhatsapp className='icn-w'/> WhatsApp</a></li>
            </ul>
          </>
        ) : (
          <>
            <ul>
                <li><a href="https://open.spotify.com/playlist/6Pa1vPI5eSME4VjJwM6RUI?si=bf624aa848754889" target='_blank'><FaSpotify className='icn-s'/></a> Spotify</li>
                <li><a href="https://www.facebook.com/youneednosaintz" target='_blank'><FaFacebook className='icn-i'/></a> Facebook</li>
                <li><a href="mailto:info.nosaintz@gmail.com" target='_blank'><FaMailBulk className='icn-m'/></a> Mail</li>
                <li><a href="https://wa.me/393299760718" target='_blank'><FaWhatsapp className='icn-w'/> WhatsApp</a></li>
            </ul>
          </>
        )}
    </footer>
  )
}

export default Footer