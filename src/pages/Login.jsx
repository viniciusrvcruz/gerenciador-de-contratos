import { useContext } from "react"
import { AuthContext } from "../contexts/authProvider"
import { Navigate } from "react-router-dom"

export const Login = () => {

    const { signInGoogle, signed } = useContext(AuthContext)

    const loginGoogle = async () => {
        await signInGoogle()
    }

    if(!signed) {
        return (
            <button onClick={loginGoogle}>Logar com o Google</button>
          )
    } else {
        return <Navigate to='/home' />
    }

}
