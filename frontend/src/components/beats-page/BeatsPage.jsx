import React, { useState, useEffect } from 'react'
import './BeatsPage.css'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import { getAvailableBeats } from '../../services/api'

const BeatsPage = () => {
	const [beats, setBeats] = useState([])

	useEffect(() => {
        getAvailableBeats()
            .then(data => setBeats(data || []))
            .catch(err => console.error('Failed to load beats:', err))
    }, [])

	return (
		<div className='beatspage-container'>
            <div className='navbar'>
                <Navbar />
            </div>
            
			<h1>Beats Store</h1>
			<p className='intro'>Browse our exclusive beats. Each beat is sold with full exclusive rights.</p>
			{beats.length === 0 ? (
				<p style={{textAlign:'center', color:'#fff', fontSize:'18px', padding:'40px', minHeight: '300px'}}>
					No beats yet...
				</p>
			) : (
				<div className='beats-grid'>
					{beats.map(beat => (
						<div className='beat-card' key={beat.id}>
							<Link to={`/beats/${beat.id}`}>
								<img src={`/src/assets/${beat.image}`} alt={beat.title} />
							</Link>
							<div className='info'>
								<div className='title'>{beat.title}</div>
								<div className='genre'>{beat.genre}</div>
								<div className='details'>BPM: {beat.bpm} | Key: {beat.keySignature}</div>
								<div className='price'>€{beat.price.toFixed(2)}</div>
								<div className='links'>
									<Link to={`/beats/${beat.id}`}>View</Link>
									<Link to="/basket">Basket</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
            <Footer />
		</div>
	)
}

export default BeatsPage
