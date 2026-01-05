import React from 'react'
import './Gallery.css'
import img1 from '../../assets/IMG_0357.JPG'
import img2 from '../../assets/Kesmo_Mezzanotte_14.jpg'
import img3 from '../../assets/IMG_0424.PNG'
import img4 from '../../assets/Kesmo_Mezzanotte_28.jpg'
import img5 from '../../assets/IMG_0423.PNG'
import img6 from '../../assets/IMG_0357.JPG'
import img7 from '../../assets/IMG_0358.JPG'
import img8 from '../../assets/Kesmo_Mezzanotte_29.jpg'
import img9 from '../../assets/Kesmo_Mezzanotte_34.jpg'
import img10 from '../../assets/IMG_0423.PNG'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const images = [img1,img2,img3,img4,img5, img6, img7, img8, img9, img10]

const Gallery = () => {
  return (
    <div className='gallery-container'>
        <Navbar></Navbar>
        <h1>Gallery</h1>
        <div className='grid'>
            {images.map((src, i) => (
            <div className='grid-item' key={i}>
                <img src={src} alt={`gallery-${i}`} />
            </div>
            ))}
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Gallery
