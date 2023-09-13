import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import userImg from '../../assets/user_icon.png'
import { ModalUser } from '../../components/modal/ModalUser/ModalUser'

export const Header = () => {
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
        <Link to="/home">ES</Link>
        <h3>Olá, {user.displayName}</h3>
        <img src={user.photoURL ? user.photoURL : userImg} alt="Foto de perfil" onClick={() => setOpen(!open)} />
        <ModalUser user={user} isOpen={open} setOpen={setOpen}/>
    </header>
  )
}
