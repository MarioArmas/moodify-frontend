import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser, registerUser } from '../api/loginUser'
import styles from './AuthForm.module.css'

export default function AuthForm({ type = 'login' }) {
  const navigate = useNavigate()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const errorMessage = useRef()
  const { login } = useAuth()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    errorMessage.current.innerText = ''
    try {
      const res = await loginUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      
      login(res)
      navigate('/app/home')
    } catch (err) {
      errorMessage.current.innerText = err.response.data.message
    }
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault()
    errorMessage.current.innerText = ''

    if (!isValidPassword(passwordRef.current.value, confirmPasswordRef.current.value)) {
      errorMessage.current.innerText = 'Passwords do not match or are too short'
      return
    }

    try {
      const res = await registerUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })

      login(res)
      navigate('/app/home')
    } catch (err) {
      errorMessage.current.innerText = err.response.data.message
    }
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

        <p id='error-message' className='error-message' ref={errorMessage}></p>

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
