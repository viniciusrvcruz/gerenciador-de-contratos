import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { PrivateRoutes } from './PrivateRoutes'
import { PaginaNaoEncontrada } from '../components/pages/PaginaNaoEncontrada'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<PrivateRoutes />}>
                <Route path='/home' element={<Home />} />   
            </Route>
            <Route path='*' element={<PaginaNaoEncontrada />} />
        </Routes>
    </BrowserRouter>
  )
}
