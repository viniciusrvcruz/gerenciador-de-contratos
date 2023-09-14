import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import userIcon from '../../../assets/user_icon.png'
import styles from './ModalUser.module.css'
import { AuthContext } from '../../../contexts/AuthProvider'

export const ModalUser = ({ user, isOpen, setOpen }) => {
    const { logout } = useContext(AuthContext)

    if (isOpen) {
        return (
            <div className={styles.userOptionsContainer} onClick={() => setOpen(!isOpen)}>
                <div className={styles.userOptions} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.userInfo}>
                        <img src={user.photoURL ? user.photoURL : userIcon} alt="" />
                        <ul>
                            <li className={styles.nameUser}>{user.displayName}</li>
                            <li className={styles.emailUser}>{user.email}</li>
                        </ul>
                    </div>
                    <div className={styles.myContracts}>
                        <Link to="/mycontracts" onClick={() => setOpen(!isOpen)}>Meus Contratos</Link>
                    </div>
                    <div className={styles.sair} onClick={() => logout()}>Sair</div>
                </div>
            </div>
        )
    } else {
        <></>
    }

}
