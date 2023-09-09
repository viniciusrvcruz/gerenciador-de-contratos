import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../components/config/FirebaseConfig";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadStoreAuth = () => {
            onAuthStateChanged(auth, (user) => {
                setUser(user)
                console.log('teste')
                  // ...
              });
        }
        loadStoreAuth()
    }, [])

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    const logout = async () => {
        await signOut(auth)
      } 

    return (
        <AuthContext.Provider value={{ signInGoogle, logout, signed: !!user, user }}>{ children }</AuthContext.Provider>
    )
}
