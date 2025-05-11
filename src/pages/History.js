import { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import SongsList from '../components/SongsList'
import { getHistory } from '../api/songs'
import { useAuth } from '../context/AuthContext'

export default function History() {
  const [filtroActivo, setFiltroActivo] = useState('ALL')
  const { token, username } = useAuth()
  const [songs, setSongs] = useState([])
  const [songsFiltered, setSongsFiltered] = useState([])

  useEffect(() => {
    getHistory({ username, token })
    .then((data) => {
      setSongs(data)
    })
  }, [token, username])
  
  useEffect(() => {
    if (filtroActivo.toLowerCase() === 'all') {
      setSongsFiltered(songs)
    } else {
      const filteredSongs = songs.filter((song) => song.Song.Emotion.name.toLowerCase() === filtroActivo.toLowerCase())
      setSongsFiltered(filteredSongs)
    }
  }, [songs, filtroActivo])

  return (
    <div className='container'>
      <h2>History</h2>
      <Filter filtroActivo={filtroActivo} setFiltroActivo={setFiltroActivo} />
      <SongsList songs={songsFiltered} />
    </div>
  )
}
