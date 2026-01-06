import React, { useContext } from 'react'
import './Navbar.css'
const img = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0423.PNG'
import { Link } from 'react-router-dom'
import { FaBasketShopping, FaBars } from 'react-icons/fa6'
import { MenuContext } from '../../context/MenuContext'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
  const { setOpen } = useContext(MenuContext)
  const { items } = useCart()
  const totalCount = items.reduce((s, it) => s + (it.qty || 0), 0)

  return (
    <nav className='container'>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Open menu"><FaBars/></button>
        <img src={img} alt="" className='img' style={{marginRight: '17.5vh'}}/>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/beats">Beats</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
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
