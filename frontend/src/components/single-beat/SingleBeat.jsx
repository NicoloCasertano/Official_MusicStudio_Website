import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './SingleBeat.css'
import { useCart } from '../../context/CartContext'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { getBeat } from '../../services/api'
import api from '../../services/api'

// Import all cover images for dynamic selection
import bCover1 from '../../assets/bCover_img1.jpg'
import bCover2 from '../../assets/bCover_img2.jpg'
import bCover3 from '../../assets/bCover_img3.jpg'
import bCover4 from '../../assets/bCover_img4.jpg'
import bCover5 from '../../assets/bCover_img5.jpg'
import bCover6 from '../../assets/bCover_img6.jpg'
import bCover7 from '../../assets/bCover_img7.jpg'
import bCover8 from '../../assets/bCover_img8.jpg'
import bCover9 from '../../assets/bCover_img9.jpg'
import bCover10 from '../../assets/bCover_img10.jpg'
import bCover11 from '../../assets/bCover_img11.jpg'
import bCover12 from '../../assets/bCover_img12.jpg'
import bCover13 from '../../assets/bCover_img13.jpg'
import bCover14 from '../../assets/bCover_img14.jpg'

// Map image filenames to imported assets
const coverImageMap = {
  'bCover_img1.jpg': bCover1,
  'bCover_img2.jpg': bCover2,
  'bCover_img3.jpg': bCover3,
  'bCover_img4.jpg': bCover4,
  'bCover_img5.jpg': bCover5,
  'bCover_img6.jpg': bCover6,
  'bCover_img7.jpg': bCover7,
  'bCover_img8.jpg': bCover8,
  'bCover_img9.jpg': bCover9,
  'bCover_img10.jpg': bCover10,
  'bCover_img11.jpg': bCover11,
  'bCover_img12.jpg': bCover12,
  'bCover_img13.jpg': bCover13,
  'bCover_img14.jpg': bCover14,
}

// Fallback image
const defaultCoverImage = bCover1

// Helper function to get cover image
const getCoverImage = (imageName) => {
  if (imageName && coverImageMap[imageName]) {
    return coverImageMap[imageName]
  }
  return defaultCoverImage
}

const SingleBeat = () => {
  const { id } = useParams()
  const [beat, setBeat] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    getBeat(id)
      .then(data => {
        setBeat(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load beat:', err)
        setLoading(false)
      })
  }, [id])

  if(loading) return <div style={{color:'#fff',padding:40}}>Loading...</div>
  if(!beat) return <div style={{color:'#fff',padding:40}}>Beat not found</div>
  if(beat.sold) return <div style={{color:'#fff',padding:40}}>This beat has been sold (exclusive rights)</div>

  return (
    <div>
        <Navbar />
        <div className='single-beat container'>
            <div className='content'>
                <div className='left'>
                    <h1>{beat.title}</h1>
                    <div className='beat-info'>
                        <span className='badge'>{beat.genre}</span>
                        <span className='info-item'>BPM: {beat.bpm}</span>
                        <span className='info-item'>Key: {beat.keySignature}</span>
                    </div>
                    <div className='price'>Price: <strong>€{beat.price.toFixed(2)}</strong></div>
                    
                    {beat.audioPath && (
                      <div className='audio-player'>
                        <audio controls controlsList="nodownload" style={{width:'100%'}} className='audio-player'>
                          <source src={`${api.API_BASE.replace('/api', '')}/api/beats/audio/${encodeURIComponent(beat.audioPath)}`} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}

                    <div className='actions'>
                        <button className='btn' onClick={()=> addItem({...beat, image: getCoverImage(beat.image)},1)}>Add to basket</button>
                    </div>
                    <div className='more'>
                        <h3>Exclusive Rights</h3>
                        <p><strong>This beat is sold with EXCLUSIVE RIGHTS.</strong></p>
                        <p>Once purchased, the beat will be removed from our store and you will own full exclusive rights.</p>
                        <p>High-quality WAV file delivered instantly after purchase.</p><br /><br />
                    </div>
                </div>
                <div className='right'>
                    <img src={getCoverImage(beat.image)} alt={beat.title} />
                    <div className='price-tag'>€{beat.price.toFixed(2)}</div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default SingleBeat
