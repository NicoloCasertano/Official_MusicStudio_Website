import React, { useState, useEffect } from 'react'
import './BeatsHome.css'
import Beat from '../beats/Beat'
import { getAvailableBeats } from '../../services/api'

const BeatsHome = () => {
    const [start, setStart] = useState(0)
    const [beats, setBeats] = useState([])
    const maxVisible = 5

    useEffect(() => {
        getAvailableBeats()
            .then(data => setBeats(data || []))
            .catch(err => console.error('Failed to load beats:', err))
    }, [])

    return (
        <div className='beats-section'>
            <h2 style={{textAlign:'center',color:'#fff', marginBottom: '-8vh', marginTop: '12vh'}}>BEATS ON SALE</h2>
            <h6 style={{textAlign:'center',color:'#fff', marginBottom: '-8vh', marginTop: '10vh', fontWeight: 'lighter'}}>
                Create an account or log in if you want to purchase, then you can also book a session in the Calendar page, feel free to Contact Us 
            </h6>
            {beats.length === 0 ? (
                <p style={{textAlign:'center', color:'#fff', fontSize:'18px', padding:'40px'}}>
                    No beats yet...
                </p>
                
            ) : (
                <div className='slider'>
                    {beats.length > 1 && <button className='arrow left' onClick={() => setStart((s) => (s - 1 + beats.length) % beats.length)}>&lt;</button>}
                    <div className='slides' style={{justifyContent: beats.length < maxVisible ? 'center' : 'flex-start'}}>
                        {Array.from({ length: Math.min(maxVisible, beats.length) }).map((_, i) => {
                            const beat = beats[(start + i) % beats.length];
                            return (
                                <div className='slide-item' key={beat.id || i}>
                                    <Beat beat={beat} />
                                </div>
                            );
                        })}
                    </div>
                    {beats.length > 1 && <button className='arrow right' onClick={() => setStart((s) => (s + 1) % beats.length)}>&gt;</button>}
                </div>
            )}
            <div className='top-line'></div>
        </div>
    )
}

export default BeatsHome