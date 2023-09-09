import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authProvider'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export const Header = () => {
    const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
        <Link to="/home">ES</Link>
        <h3>Olá, {user.displayName}</h3>
        <img src={user.photoURL} alt="Foto de perfil" />
    </header>
  )
}
