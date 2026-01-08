import React from 'react'
import './Hero.css'

const heroImgDesktop = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0424.PNG'
const heroImgMobile = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0423.PNG'

const Hero = () => {
  return (
    <div className='container'>
        <img src={heroImgDesktop} alt="Hero" className='hero hero-desktop'/>
        <img src={heroImgMobile} alt="Hero" className='hero hero-mobile'/>
        <h1 className='hero-mobile-h1' style={{color:'white'}}>YOU NEED NOSAINTZ</h1>
        <h3 className='hero-mobile-h3'>Open the menu on the left to log in or create a new account. You can buy beats and book a session to record them</h3>
    </div>
  )
}

export default Hero