import React from 'react'
import './AboutUs.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import imgLeft from '../../assets/studio-img1.jpeg'
import imgRight from '../../assets/studio-img2.jpeg'
import imgAlt from '../../assets/studio-img3.jpeg'

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <main className='about-us-ctn container'>
        <section className='hero'>
          <h2 className='eyebrow'>About</h2>
          <p className='lead'>NoSaintz is a creative collective blending music, visual art and street culture — we make records, shows and merch that speak to the midnight crowd.</p>
        </section>

        <section className='row'>
          <div className='media'>
            <img src={imgLeft} alt='studio' />
          </div>
          <div className='text big'>
            <h1>YOU</h1>
          </div>
        </section>

        <section className='row'>
          <div className='text big'>
            <h1>NEED</h1>
          </div>
          <div className='media'>
            <img src={imgRight} alt='performance' />
          </div>
        </section>

        <section className='row'>
          <div className='media'>
            <img src={imgAlt} alt='crowd' />
          </div>
          <div className='text big'>
            <h1>NOSAINTZ</h1>
          </div>
        </section>

        <section className='story'>
          <h3>Our Work</h3>
          <p>We produce records, design apparel and stage live events with an emphasis on authenticity and craft. Our studio 'La Cripta' hosts rehearsals and recording sessions. We collaborate with visual artists and local brands to create limited-run pieces — all made with care.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AboutUs