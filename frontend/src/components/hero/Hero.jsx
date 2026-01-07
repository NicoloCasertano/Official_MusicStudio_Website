import React from 'react'
import './Hero.css'

const heroImgDesktop = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0424.PNG'
const heroImgMobile = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0423.PNG'

const Hero = () => {
  return (
    <div className='container'>
        <img src={heroImgDesktop} alt="Hero" className='hero hero-desktop'/>
        <img src={heroImgMobile} alt="Hero" className='hero hero-mobile'/>
    </div>
  )
}

export default Hero