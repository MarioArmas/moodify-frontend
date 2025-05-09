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
            <a
              href='/app/home'
              className={`link ${
                currentPath === '/app/home' ? styles.activeLink : ''
              }`}
            >
              Home
            </a>
            <a
              href='/app/recommendations'
              className={`link ${
                currentPath === '/app/recommendations' ? styles.activeLink : ''
              }`}
            >
              Recommendations
            </a>
            <a
              href='/app/history'
              className={`link ${
                currentPath === '/app/history' ? styles.activeLink : ''
              }`}
            >
              History
            </a>
          </div>
          <button href='/' className='link logout' onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <a
            href='/signup'
            className={`link ${
              currentPath === '/signup' ? styles.activeLink : ''
            }`}
          >
            Signup
          </a>
          <a
            href='/login'
            className={`link ${
              currentPath === '/login' ? styles.activeLink : ''
            }`}
          >
            Login
          </a>
        </div>
      )}
    </nav>
  )
}
