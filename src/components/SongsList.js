import React from 'react'
import Song from './Song'

export default function SongsList({ songs }) {
  return (
    <>
      {songs &&
        songs.map((song) => {
          return (
            <Song
              id={song.id_recommendation}
              name={song.Song.name}
              artist={song.Song.artist}
              url={song.Song.url_spotify}
            />
          )
        })}
    </>
  )
}
