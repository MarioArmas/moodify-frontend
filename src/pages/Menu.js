import React from 'react'
import { Link } from 'react-router-dom'
import { MdHistory, MdOutlineFileUpload } from 'react-icons/md'
import SongsList from '../components/SongsList'

export default function Menu() {
  return (
    <div className='container'>
      <h2>Dashboard</h2>
      <p>
        Welcome to Moodify! Upload a photo to get music recommendations based on
        your mood.
      </p>
      <section>
        <div className='section'>
          <div className='sub-section'>
            <p>Upload a photo</p>
            <MdOutlineFileUpload />
          </div>
          <h4>Get Started</h4>
          <Link to='/app/recommendations' className='btn'>
            Upload Now
          </Link>
        </div>
        <div className='section'>
          <div className='sub-section'>
            <p>View History</p>
            <MdHistory />
          </div>
          <h4>Your History</h4>
          <Link to='/app/history' className='btn'>
            View History
          </Link>
        </div>
      </section>

      <h3>Recent Recommendations</h3>
      <SongsList songs={[1, 2, 3]} />
    </div>
  )
}
