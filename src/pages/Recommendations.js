import { useEffect, useState } from 'react'
import { getRecommendationSongs } from '../api/songs'
import SongsList from '../components/SongsList'
import ImageUploader from '../components/ImageUploader'

export default function Recommendations() {
  const [emotionAWS, setEmotionAWS] = useState('happy')
  const [emotionDB, setEmotionDB] = useState(null)
  const [songs, setSongs] = useState([])
  
  useEffect(() => {
    if (!emotionAWS) return
    getRecommendationSongs(emotionAWS)
    .then((data) => {
      setSongs(data.songs)
      setEmotionDB(data.emotion)
    })
  }, [emotionAWS])

  return (
    <div className='container'>
      <h2>Upload your photo</h2>
      <ImageUploader />

      {
        emotionDB && (
          <>
            <h3>Detected Emotion: {emotionDB.name}</h3>
            <p>{emotionDB.description}</p>
            <h3>Recommended Songs:</h3>
          </>
        )
      }
      {
        songs && emotionDB && <SongsList songs={songs} />
      }
    </div>
  )
}