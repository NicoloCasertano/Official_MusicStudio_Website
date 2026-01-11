import React from 'react'
import './AboutUs.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Link } from 'react-router-dom'
import CookiePolicy from '../cookie-policy/CookiePolicy'
import PrivacyPolicy from '../privacy-policy/PrivacyPolicy'

const imgLeft = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/studio-img1.jpeg'
const imgRight = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/studio-img2.jpeg'
const imgAlt = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/studio-img3.jpeg'

const AboutUs = () => {
  return (
    <div>
      <main className='about-us-ctn container'>
        <section className='hero'>
          <h2 className='eyebrow'>About</h2>
          <p className='lead'>NoSaintz is a Producer Duo born in the south side of Milan and it's an active project since 2019. 
            The "Cripta" studio is not just a recording/mix and master room, is a place where your ideas and your persona take place, to create a professional project. 
            Is not just a studio, it's a home... and you're welcome</p>
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
          <p>We care about all the stages of prod, from writing to record, to the final mix and master process. Contact us or book a session in the Calendar page. Don't forget to see out social</p>
        </section>
        <div className='top-line'></div>
        <div className='pt-iva-ctn'>
          <ul>
            <li className='pt-iva'>Via Galileo Galilei, 10, Civesio, San Giuliano Milanese (MI), 20098</li><br />
            <li className='pt-iva'>info.nosaintz@gmail.com - cell. 3299760718 - cell. 3334682515</li>
          </ul>
          <ul>
            <li className="pt-iva-c" title="Privacy Policy " ><Link to='/privacy-policy' style={{textDecoration:'none'}}>Privacy Policy</Link></li><br />
            <li className="pt-iva-c" title="Cookie Policy " ><Link to='/cookies-policy' style={{textDecoration:'none'}}>Cookie Policy</Link></li>
          </ul>
          <ul>
            <li className='pt-iva-n'>Nicolò Casertano - Producer, Composer - PT. IVA - 14482220960</li><br />
            <li className='pt-iva-n'>Andre Bon - Producer, Sound Engineer - PT. IVA - 77788880777</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default AboutUs