import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { PageNotFound } from '../components/pages/PageNotFound'
import { Login } from '../components/pages/Login/Login'
import { Home } from '../components/pages/Home/Home'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<PrivateRoutes />}>
                <Route path='/home' element={<Home />} />   
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
  )
}
