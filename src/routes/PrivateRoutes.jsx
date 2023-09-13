import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authProvider'
import { Navigate, Outlet } from 'react-router-dom'
import { Loading } from '../components/loading/Loading';

export const PrivateRoutes = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const { signed } = useContext(AuthContext)

  useEffect(() => {
    // Simule um atraso de 1 segundo (1000 milissegundos)
    setTimeout(() => {
      setAuthChecked(true);
    }, 500);
  }, []);



  return authChecked ? (
    signed ? <Outlet /> : <Navigate to='/' />
  ) : (
    // Você pode mostrar um componente de carregamento aqui
    <Loading />
  );
}
