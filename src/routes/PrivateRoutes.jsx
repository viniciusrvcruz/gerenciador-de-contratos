import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'
import { Loading } from '../components/loading/Loading';

export const PrivateRoutes = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const { signed } = useContext(AuthContext)

  useEffect(() => {
    // 0.5 second delay (500 milliseconds)
    setTimeout(() => {
      setAuthChecked(true);
    }, 500);
  }, []);



  return authChecked ? (
    signed ? <Outlet /> : <Navigate to='/' />
  ) : (
    
    <Loading />
  );
}
