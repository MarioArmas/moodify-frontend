import React, { useState } from 'react'
import Filter from '../components/Filter'
import SongsList from '../components/SongsList'

export default function History() {
  const [filtroActivo, setFiltroActivo] = useState('All')

  return (
    <div className='container'>
      <h2>History</h2>
      <Filter filtroActivo={filtroActivo} setFiltroActivo={setFiltroActivo} />
      <SongsList songs={[1, 2, 3]} />
    </div>
  )
}
