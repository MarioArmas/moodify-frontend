import React from 'react'
import styles from './Filter.module.css'

export default function Filter({ filtroActivo, setFiltroActivo }) {
  const filtros = ['All', 'Mood 1', 'Mood 2', 'Mood 3']

  return (
    <div className={styles.container}>
      {filtros.map((filtro) => (
        <button
          key={filtro}
          onClick={() => setFiltroActivo(filtro)}
          className={`${styles.btn} ${filtroActivo === filtro ? styles.active : ''}`}
        >
          {filtro}
        </button>
      ))}
    </div>
  )
}
