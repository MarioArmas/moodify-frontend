import { useEffect, useState } from 'react'
import { getRecommendationSongs, getEmotionAWS } from '../api/songs'
import SongsList from '../components/SongsList'
import ImageUploader from '../components/ImageUploader'

export default function Recommendations() {
  const [emotionAWS, setEmotionAWS] = useState(null)
  const [emotionDB, setEmotionDB] = useState(null)
  const [songs, setSongs] = useState([])
  const [imageFile, setImageFile] = useState(null)
  
  useEffect(() => {
    if (!imageFile) return
    getEmotionAWS(imageFile)
    .then((data) => {
      setEmotionAWS(data.emotion)
    })
  }, [imageFile])
  
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
      <ImageUploader setImageFile={setImageFile} />
      {
        emotionDB && (
          <>
            <h3>Detected Emotion: {emotionDB.name}</h3>
            <p>{emotionDB.description}</p>
            <h3>Recommended Songs:</h3>
          </>
        )
      }
      <SongsList songs={songs} />
    </div>
  )
}