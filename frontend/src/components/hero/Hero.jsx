import React from 'react'
import './Hero.css'
import heroImg from '../../assets/IMG_0424.PNG'

const Hero = () => {
  return (
    <div className='container'>
        <img src={heroImg} alt="Hero" className='hero'/>
    </div>
  )
}

export default Hero