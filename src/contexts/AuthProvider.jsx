import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../components/config/FirebaseConfig";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [tokenApi, setTokenApi] = useState('')

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

    const getTokenApi = async() => {
        const clientId = "691c10007d1541cea6786e3d0b214b7e";
        const clientSecret = "5117f73779664a24b0b1949b98ac027e";
        
        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
        };
        
        const tokenUrl = 'https://accounts.spotify.com/api/token';
        
        // Enviar a solicitação
        fetch(tokenUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Aqui, você pode acessar o token de acesso na variável 'data.access_token'
            const accessToken = data.access_token;
            console.log('Token de Acesso:', accessToken);
            setTokenApi(accessToken)
        })
        .catch(error => {
            console.error('Erro ao solicitar token de acesso:', error);
        });
    }

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                getTokenApi()
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
        <AuthContext.Provider value={{ signInGoogle, logout, signed: !!user, user, tokenApi, getTokenApi }}>{ children }</AuthContext.Provider>
    )
}
