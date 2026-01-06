import React from 'react'
import './Gallery.css'
const img1 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0357.JPG'
const img2 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/Kesmo_Mezzanotte_14.jpg'
const img3 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0424.PNG'
const img4 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/Kesmo_Mezzanotte_28.jpg'
const img5 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0423.PNG'
const img6 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0357.JPG'
const img7 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0358.JPG'
const img8 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/Kesmo_Mezzanotte_29.jpg'
const img9 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/Kesmo_Mezzanotte_34.jpg'
const img10 = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/IMG_0423.PNG'
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
