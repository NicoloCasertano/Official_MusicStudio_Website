import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './SingleBeat.css'
import { useCart } from '../../context/CartContext'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { getBeat } from '../../services/api'
import api from '../../services/api'

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
                        <button className='btn' onClick={()=> addItem({...beat, image: `/src/assets/${beat.image}`},1)}>Add to basket</button>
                    </div>
                    <div className='more'>
                        <h3>Exclusive Rights</h3>
                        <p><strong>This beat is sold with EXCLUSIVE RIGHTS.</strong></p>
                        <p>Once purchased, the beat will be removed from our store and you will own full exclusive rights.</p>
                        <p>High-quality WAV file delivered instantly after purchase.</p><br /><br />
                    </div>
                </div>
                <div className='right'>
                    <img src={`/src/assets/${beat.image}`} alt={beat.title} />
                    <div className='price-tag'>€{beat.price.toFixed(2)}</div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default SingleBeat
