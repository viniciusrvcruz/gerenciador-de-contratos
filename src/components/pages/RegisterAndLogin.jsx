import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const RegisterAndLogin = () => {
  const [login, setLogin] = useState(false)

    const history = useNavigate()

    const handleSubmit = (e, type) => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value

      if(type == 'signup') {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(userCredential, "authData")
          history('/home')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      } else {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(userCredential, "authData")
          history('/home')
          // ...
        })
        .catch((error) => {
          alert(error.code)
          const errorCode = error.code;
          const errorMessage = error.message;
          setLogin(true)
        });
      }

      

    }

  return (
    <div>
      <div>
        <button onClick={() => setLogin(false)}>SignUp</button>
        <button onClick={() => setLogin(true)}>SignIn</button>
      </div>
        <h1>{login ? 'SignIn' : 'SignUp'}</h1>
        <form onSubmit={(e) => handleSubmit(e, login ? 'signin' : 'signup')}>
            <input type="email" name='email' placeholder='Email' /><br/>
            <input type="password" name='password' placeholder='Password' minLength={6}/><br/><br/>
            <button>{login ? 'SignIn' : 'SignUp'}</button>
        </form>
    </div>
  )
}
