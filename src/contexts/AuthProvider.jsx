import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../components/config/FirebaseConfig";
import { createContext, useEffect, useState } from "react";

// Create a GoogleAuthProvider instance for Google OAuth authentication
const provider = new GoogleAuthProvider();

// Create an AuthContext to manage authentication state
export const AuthContext = createContext({})

// Define an AuthProvider component to manage authentication
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [tokenApi, setTokenApi] = useState('')

    useEffect(() => {
        // Use onAuthStateChanged to listen for changes in authentication state
        const loadStoreAuth = () => {
            onAuthStateChanged(auth, (user) => {
                setUser(user)
              });
        }
        loadStoreAuth()
    }, [])

    // Function to obtain an API token from Spotify
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
        
        // Send the API token request
        fetch(tokenUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Access the access token in 'data.access_token'
            const accessToken = data.access_token;
            setTokenApi(accessToken)
        })
        .catch(error => {
            console.error('Erro ao solicitar token de acesso:', error);
        });
    }

    // Function to sign in with Google
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

    // Function to log out
    const logout = async () => {
        await signOut(auth)
      } 

    // Provide authentication-related functions and state to child components
    return (
        <AuthContext.Provider value={{ signInGoogle, logout, signed: !!user, user, tokenApi, getTokenApi }}>{ children }</AuthContext.Provider>
    )
}
