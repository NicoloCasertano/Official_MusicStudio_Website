import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './SingleBeat.css'
import { useCart } from '../../context/CartContext'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { getBeat } from '../../services/api'
import api from '../../services/api'
import img from '../../assets/img_tablet_singleBeat.jpg'

// GitHub raw URL base for cover images
const GITHUB_ASSETS_BASE = 'https://raw.githubusercontent.com/NicoloCasertano/Official_MusicStudio_Website/main/frontend/src/assets/'

// Map image filenames to GitHub URLs
const coverImageMap = {
  'bCover_img1.jpg': `${GITHUB_ASSETS_BASE}bCover_img1.jpg`,
  'bCover_img2.jpg': `${GITHUB_ASSETS_BASE}bCover_img2.jpg`,
  'bCover_img3.jpg': `${GITHUB_ASSETS_BASE}bCover_img3.jpg`,
  'bCover_img4.jpg': `${GITHUB_ASSETS_BASE}bCover_img4.jpg`,
  'bCover_img5.jpg': `${GITHUB_ASSETS_BASE}bCover_img5.jpg`,
  'bCover_img6.jpg': `${GITHUB_ASSETS_BASE}bCover_img6.jpg`,
  'bCover_img7.jpg': `${GITHUB_ASSETS_BASE}bCover_img7.jpg`,
  'bCover_img8.jpg': `${GITHUB_ASSETS_BASE}bCover_img8.jpg`,
  'bCover_img9.jpg': `${GITHUB_ASSETS_BASE}bCover_img9.jpg`,
  'bCover_img10.jpg': `${GITHUB_ASSETS_BASE}bCover_img10.jpg`,
  'bCover_img11.jpg': `${GITHUB_ASSETS_BASE}bCover_img11.jpg`,
  'bCover_img12.jpg': `${GITHUB_ASSETS_BASE}bCover_img12.jpg`,
  'bCover_img13.jpg': `${GITHUB_ASSETS_BASE}bCover_img13.jpg`,
  'bCover_img14.jpg': `${GITHUB_ASSETS_BASE}bCover_img14.jpg`,
}

// Fallback image
const defaultCoverImage = `${GITHUB_ASSETS_BASE}bCover_img1.jpg`

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
            <div className='img-tablet-ctn'>
                <img src={img} alt="" className='img-tablet'/>
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default SingleBeat
