import React, { useState, useEffect } from 'react'
import './BeatsPage.css'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import Beat from '../beats/Beat'
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
						<Beat beat={beat} key={beat.id} />
					))}
				</div>
			)}
            <Footer />
		</div>
	)
}

export default BeatsPage
