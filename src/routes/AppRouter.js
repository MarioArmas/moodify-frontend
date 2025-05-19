import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import PrivateRoutes from './PrivateRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Menu from '../pages/Menu'
import Recommendations from '../pages/Recommendations'
import Statistics from '../pages/Statistics'
import History from '../pages/History'
import Navbar from '../layouts/Navbar'

export default function AppRouter() {
  const location = useLocation()
  const isAltRoute = location.pathname.startsWith('/app')

  return (
    <div className='App'>
      <Navbar App={isAltRoute} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/app/home'
          element={
            <PrivateRoutes>
              <Menu />
            </PrivateRoutes>
          }
        />
        <Route
          path='/app/recommendations'
          element={
            <PrivateRoutes>
              <Recommendations />
            </PrivateRoutes>
          }
        />
        <Route
          path='/app/history'
          element={
            <PrivateRoutes>
              <History />
            </PrivateRoutes>
          }
        />
        <Route
          path='/app/statistics'
          element={
            <PrivateRoutes>
              <Statistics />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  )
}
