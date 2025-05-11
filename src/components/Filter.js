import React from 'react'
import styles from './Filter.module.css'

export default function Filter({ filtroActivo, setFiltroActivo }) {
  const filtros1 = ['ALL', 'HAPPY', 'SAD', 'ANGRY', 'CONFUSED']
  const filtros2 = ['DISGUSTED', 'SURPRISED', 'CALM', 'UNKNOWN', 'FEAR']

  return (
    <>
      <div className={styles.container}>
        {filtros1.map((filtro) => (
          <button
            key={filtro}
            onClick={() => setFiltroActivo(filtro)}
            className={`${styles.btn} ${filtroActivo === filtro ? styles.active : ''}`}
          >
            {filtro.charAt(0).toUpperCase() + filtro.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className={`${styles.container} ${styles.container2}`}>
        {filtros2.map((filtro) => (
          <button
            key={filtro}
            onClick={() => setFiltroActivo(filtro)}
            className={`${styles.btn} ${filtroActivo === filtro ? styles.active : ''}`}
          >
            {filtro.charAt(0).toUpperCase() + filtro.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </>
  )
}
