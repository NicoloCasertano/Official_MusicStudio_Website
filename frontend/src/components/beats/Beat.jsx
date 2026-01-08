import React, { useContext, useRef, useState, useEffect } from 'react'
import './Beat.css'
import { CartContext } from '../../context/CartContext'
import { FaPlay, FaPause } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

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

// Global variable to track currently playing audio
let currentlyPlayingAudio = null

export default function Beat({ beat }) {
  const navigate = useNavigate()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [user, setUser] = useState(null)
  const playTimeoutRef = useRef(null)
  
  // Get the cover image for this beat
  const getCoverImage = () => {
    if (beat.image && coverImageMap[beat.image]) {
      return coverImageMap[beat.image]
    }
    return defaultCoverImage
  }

  // Load user from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('sa_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (e) {
      console.error('Failed to load user', e)
    }
  }, [])

  const canBuy = !!(user && user.isSubscribed)
  
  const handleCardClick = (e) => {
    // Don't navigate if clicking on the play button or buy button
    if (e.target.closest('.beat-play-toggle') || e.target.closest('.beat-actions')) {
      return
    }
    navigate(`/beats/${beat.id}`)
  }

  // Genre color mapping from wine-red to ocean-blue
  const genreColors = {
    'trap': '#8B1538',        // wine-red
    'drill': '#A02040',       // deep red
    'hip-hop': '#B53050',     // red-burgundy
    'rap': '#C94060',         // rose-red
    'rnb': '#D85070',         // coral-red
    'pop': '#E76080',         // pink-red
    'afrobeat': '#F57090',    // salmon
    'dancehall': '#FF80A0',   // pink
    'reggaeton': '#E888B0',   // rose-pink
    'electronic': '#D090C0',  // mauve
    'house': '#B898D0',       // lavender
    'techno': '#A0A0E0',      // periwinkle
    'edm': '#88A8F0',         // sky-blue
    'chill': '#70B0FF',       // light-blue
    'lofi': '#58B8FF',        // azure
    'ambient': '#40C0FF',     // cerulean
    'rock': '#28C8FF',        // cyan
    'indie': '#10D0FF',       // bright-cyan
    'alternative': '#00D8FF', // turquoise
    'other': '#0080C0'        // ocean-blue
  }

  const getBeatColor = () => {
    const genre = beat.genre?.toLowerCase() || 'other'
    return genreColors[genre] || genreColors['other']
  }

  function handleBuy() {
    if (!canBuy) return alert('You must be subscribed and logged in to buy beats.')
    alert('Purchasing ' + beat.title)
  }

  const handlePlayToggle = (e) => {
    e.stopPropagation()
    e.preventDefault()
    
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
        playTimeoutRef.current = null
      }
      if (currentlyPlayingAudio === audioRef.current) {
        currentlyPlayingAudio = null
      }
    } else {
      // Stop any currently playing audio
      if (currentlyPlayingAudio && currentlyPlayingAudio !== audioRef.current) {
        currentlyPlayingAudio.pause()
        currentlyPlayingAudio.dispatchEvent(new Event('pause'))
      }
      
      // Calculate start time: divide duration by 3, take first 10 seconds of second section
      const startTime = duration / 3
      audioRef.current.currentTime = startTime
      audioRef.current.play()
      setIsPlaying(true)
      currentlyPlayingAudio = audioRef.current

      // Stop after 15 seconds
      playTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause()
          setIsPlaying(false)
          if (currentlyPlayingAudio === audioRef.current) {
            currentlyPlayingAudio = null
          }
        }
      }, 15000)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    
    const handlePause = () => {
      setIsPlaying(false)
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
        playTimeoutRef.current = null
      }
    }
    
    if (audio) {
      audio.addEventListener('pause', handlePause)
    }
    
    return () => {
      if (audio) {
        audio.removeEventListener('pause', handlePause)
      }
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
      }
      if (currentlyPlayingAudio === audio) {
        currentlyPlayingAudio = null
      }
    }
  }, [])

  return (
    <article className="beat-card" onClick={handleCardClick} style={{ 
      borderLeft: `4px solid ${getBeatColor()}`,
      backgroundImage: user 
        ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${getCoverImage()})`
        : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${getCoverImage()})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'pointer'
    }}>
      <div className="beat-hover-overlay">
        <button className="beat-play-toggle" onClick={handlePlayToggle}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      <div className="beat-info">
        <h4>{beat.title}</h4>
        <span className="beat-genre" style={{ color: getBeatColor() }}>{beat.genre}</span>
        {/* <p className="price">€{beat.price}</p> */}
      </div>

      <audio 
        ref={audioRef}
        controlsList="nodownload" 
        src={beat.audioPath ? `http://localhost:8080/api/beats/audio/${encodeURIComponent(beat.audioPath)}` : ''}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      >
        Your browser does not support audio.
      </audio>

      <div className="beat-actions">
        <button onClick={(e) => { e.stopPropagation(); handleBuy(); }} disabled={!user}>
          {user ? 'Buy' : 'Subscribe to buy'}
        </button>
      </div>
    </article>
  )
}
