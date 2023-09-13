import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { Main } from './main/Main'

export const Home = () => {

  return (
    <div>
        <Main />
    </div>
  )
}
