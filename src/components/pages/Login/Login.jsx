import { useContext } from "react"
import { AuthContext } from "../../../contexts/authProvider"
import { Navigate } from "react-router-dom"
import styles from './Login.module.css'
import imgGoogle from '../../../assets/google_icon.png'

export const Login = () => {

    const { signInGoogle, signed } = useContext(AuthContext)

    const loginGoogle = async () => {
        await signInGoogle()
    }

    if(!signed) {
        return (
            <div className={styles.login}>
                <h1>Bem vindo ao</h1>
                <h2>Gerenciador de Contrados</h2>
                <p>Aqui você poderá fazer e gerenciar seus contratos com artistas e bandas</p>
                <h3>Faça login para entrar</h3>
                <button onClick={loginGoogle}><img src={imgGoogle}/><span>Entrar com o Google</span></button>
            </div>   
          )
    } else {
        return <Navigate to='/home' />
    }

}
