import React, { useContext } from 'react'
import { AuthContext } from '../contexts/authProvider'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {

    const { signed } = useContext(AuthContext)
  return (
    signed ? <Outlet /> : <Navigate to='/' />
  )
}
