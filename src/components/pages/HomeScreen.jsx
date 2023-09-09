import { signOut } from 'firebase/auth'
import { auth } from "../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";

export const HomeScreen = () => {
  const history = useNavigate()

  const handleClick = () => {
    signOut(auth).then(val => {
      console.log(val, "val")
      history('/')
    })
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  )
}
