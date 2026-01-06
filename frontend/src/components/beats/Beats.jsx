import React from 'react'
import Beat from './Beat'
import './Beats.css'
import beats from '../../data/beats'

export default function Beats() {
  return (
    <main className="beats-page">
      <h2>Beats</h2>
      <p>Add audio files to <em>public/media/beats</em> and reference them in the data file.</p>
      <div className="beats-list">
        {beats.map(b => <Beat key={b.id} beat={b} />)}
      </div>
    </main>
  )
}
