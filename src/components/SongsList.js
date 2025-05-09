import React from 'react'
import Song from './Song'

export default function SongsList({ songs }) {
  return (
    <div>
      {
        songs && songs.map(() => {
          return <Song />
        })
      }
    </div>
  )
}
