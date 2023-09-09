import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/authProvider'
import { MainHome } from './main/mainHome'

export const Home = () => {

    const { user, logout } = useContext(AuthContext)

    const sair = async () => {
        await logout()
    }

  return (
    <div>
        <div>bem vindo {user.displayName}</div>
        <button onClick={sair}>sair</button>
        <MainHome />
    </div>
  )
}
