import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { PageNotFound } from '../pages/PageNotFound'
import { Login } from '../pages/Login/Login'
import { Home } from '../pages/Home/Home'

import { AuthContext } from '../contexts/AuthProvider'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { Contract } from '../pages/Contract/Contract'
import { MyContracts } from '../pages/MyContracts/MyContracts'
import { ContractSelected } from '../pages/ContractSelected/ContractSelected'

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
            <Route path='/mycontracts' element={<PrivateRoutes />}>
                <Route path='/mycontracts' element={<MyContracts />} />   
            </Route>
            <Route path='/mycontracts/:idContract' element={<PrivateRoutes />}>
                <Route path='/mycontracts/:idContract' element={<ContractSelected />} />   
            </Route>
            <Route path='/contract/:idArtist' element={<PrivateRoutes />}>
                <Route path='/contract/:idArtist' element={<Contract />} />   
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}
