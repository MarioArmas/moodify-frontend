import { useState, useRef, useEffect } from 'react'
//import { FiMusic } from 'react-icons/fi'
import styles from './Song.module.css'

export default function Song({ name, artist, url }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      {visible && (
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
      )}
    </div>
  )
}