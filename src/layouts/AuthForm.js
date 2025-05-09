import React, { useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './AuthForm.module.css'

export default function AuthForm({ type = 'login' }) {
  const navigate = useNavigate()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { login } = useAuth()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })

      login(res.data)
      navigate('/app/home')
    } catch (err) {}
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    if (!isValidPassword(passwordRef.current.value, confirmPasswordRef.current.value)) return
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })

      login(res.data)
      navigate('/app/home')
    } catch (err) {}
  }

  const isValidPassword = (password, secondPassword) => {
    if (password !== secondPassword) return false
    if (password.length < 6) return false
    return true
  }

  return (
    <div className='auth-container'>
      <h2>{type === 'login' ? 'Login' : 'Signup'}</h2>
      <form
        onSubmit={type === 'login' ? handleLoginSubmit : handleSignupSubmit}
      >
        <div>
          <label htmlFor='name'>Nombre</label>
          <input
            ref={usernameRef}
            type='text'
            id='name'
            name='name'
            placeholder='Username'
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Contraseña</label>
          <input
            ref={passwordRef}
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            required
          />
        </div>

        {type === 'signup' && (
          <div>
            <label htmlFor='password'>Confirmar contraseña</label>
            <input
              ref={confirmPasswordRef}
              type='password'
              id='password'
              name='password'
              placeholder='Confirm password'
              required
            />
          </div>
        )}

        <button className='btn' type='submit'>
          {type === 'login' ? 'Login' : 'Sign Up'}
        </button>
        {type === 'login' ? (
          <p>
            New here?{' '}
            <Link to='/signup' className={`link ${styles.link}`}>
              Create an account
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link to='/login' className={`link ${styles.link}`}>
              Login
            </Link>
          </p>
        )}
      </form>
    </div>
  )
}
