import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { PageNotFound } from '../components/pages/PageNotFound'
import { Login } from '../components/pages/Login/Login'
import { Home } from '../components/pages/Home/Home'

import { AuthContext } from '../contexts/authProvider'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'

export const AppRoutes = () => {

  const { user } = useContext(AuthContext)

  return (
    <BrowserRouter>
        {user && <Header />}
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<PrivateRoutes />}>
                <Route path='/home' element={<Home />} />   
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}
