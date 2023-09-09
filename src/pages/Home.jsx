import React, { useContext } from 'react'
import { AuthContext } from '../contexts/authProvider'

export const Home = () => {

    const { user, logout } = useContext(AuthContext)

    const sair = async () => {
        await logout()
    }

  return (
    <div>
        <div>bem vindo {user.displayName}</div>
        <button onClick={sair}>sair</button>
    </div>
  )
}
