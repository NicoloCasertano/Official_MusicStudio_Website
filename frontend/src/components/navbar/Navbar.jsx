import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FaBasketShopping, FaBars, FaCalendarDays, FaUser } from 'react-icons/fa6'
import { MenuContext } from '../../context/MenuContext'
import { useCart } from '../../context/CartContext'

const logoDesktop = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0423.PNG'
const logoMobile = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0424.PNG'

const Navbar = () => {
  const { setOpen } = useContext(MenuContext)
  const { items } = useCart()
  const totalCount = items.reduce((s, it) => s + (it.qty || 0), 0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('sa_user')
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser)
          setUser(parsed)
        } catch (e) {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    checkUser()
    const handleUserChange = () => checkUser()
    window.addEventListener('storage', handleUserChange)
    window.addEventListener('userChanged', handleUserChange)
    const interval = setInterval(checkUser, 1000)

    return () => {
      window.removeEventListener('storage', handleUserChange)
      window.removeEventListener('userChanged', handleUserChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <nav className='container'>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Open menu"><FaBars/></button>
        
        {/* Mobile user profile - only shown on mobile when logged in, positioned on the LEFT */}
        {user && user.username && (
          <div className="navbar-user-mobile">
            {user.profileImg ? (
              <img src={user.profileImg} alt="Profile" className="navbar-profile-img" />
            ) : (
              <div className="navbar-profile-placeholder">
                <FaUser />
              </div>
            )}
            <span className="navbar-username">{user.username || user.name}</span>
          </div>
        )}
        
        {/* Desktop logo - not clickable */}
        {/* <img src={logoDesktop} alt="" className='img logo-desktop' style={{marginRight: '17.5vh'}}/> */}
        {/* Mobile logo - links to Home */}
        <Link to="/" className="logo-mobile-link">
          <img src={logoMobile} alt="" className='img logo-mobile'/>
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/beats">Beats</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li className="calendar-link">
            <Link to="/calendar">
              <FaCalendarDays />
            </Link>
          </li>
          <li className="basket-link">
            <Link to="/basket">
              <FaBasketShopping />
              {totalCount > 0 && <span className="basket-badge">{totalCount}</span>}
            </Link>
          </li>
          <li>
            <a href="mailto:info.nosaintz@gmail.com">
              <button className='btn'>Contact us</button>
            </a>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar
