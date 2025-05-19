import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function NavbarLanding({ App = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav>
      <Link to='/'>
        <h3>Moodify</h3>
      </Link>
      {App ? (
        <>
          <div>
            <Link
              to='/app/home'
              className={`link ${
                currentPath === '/app/home' ? styles.activeLink : ''
              }`}
            >
              Home
            </Link>
            <Link
              to='/app/recommendations'
              className={`link ${
                currentPath === '/app/recommendations' ? styles.activeLink : ''
              }`}
            >
              Recommendations
            </Link>
            <Link
              to='/app/history'
              className={`link ${
                currentPath === '/app/history' ? styles.activeLink : ''
              }`}
            >
              History
            </Link>
            <Link
              to='/app/statistics'
              className={`link ${
                currentPath === '/app/statistics' ? styles.activeLink : ''
              }`}
            >
              Dashboard
            </Link>
          </div>
          <button className='link logout' onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <Link
            to='/signup'
            className={`link ${
              currentPath === '/signup' ? styles.activeLink : ''
            }`}
          >
            Signup
          </Link>
          <Link
            to='/login'
            className={`link ${
              currentPath === '/login' ? styles.activeLink : ''
            }`}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}
