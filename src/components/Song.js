import React from 'react'
//import { FiMusic } from 'react-icons/fi'
import styles from './Song.module.css'

export default function Song({ name, artist, url }) {
  return (
    <div className={styles.container}>
      <iframe
        title={`${name} - ${artist}`}
        style={{
          backgroundColor: '#000',
          color: '#000'
        }}
        src={url}
        width="100%" height="80" frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy">
      </iframe>
    </div>
  )
}
