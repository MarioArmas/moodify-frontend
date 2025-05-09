import React from 'react'
import { FiMusic } from 'react-icons/fi'
import styles from './Song.module.css'

export default function Song() {
  return (
    <div className={styles.container}>
      <div className={styles.square}>
        <FiMusic color='black' className={styles.icon} />
      </div>
      <p>Canción</p>
      <p>Artista</p>
    </div>
  )
}
