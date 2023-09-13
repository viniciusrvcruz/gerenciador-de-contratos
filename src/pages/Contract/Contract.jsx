import React, { useContext, useEffect, useState } from 'react'
import styles from './Contract.module.css'
import { AuthContext } from '../../contexts/AuthProvider'
import { useParams } from 'react-router-dom'
import userIcon from '../../assets/user_icon.png'
import backIcon from '../../assets/arrow_back_icon.png'
import { ModalContractFinalized } from '../../components/modal/ModalContractFinalized/ModalContractFinalized'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../components/config/FirebaseConfig'
import { Loading } from '../../components/loading/Loading'

export const Contract = () => {
    const { user, tokenApi, getTokenApi } = useContext(AuthContext)
    const { idArtist } = useParams();

    const [open, setOpen] = useState(false)
    const [nameArtist, setNameArtist] = useState('')
    const [imageArtist, setImageArtist] = useState('')
    const [genreArtist, setGenreArtist] = useState('')
    const [cache, setCache] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [removeLoading, setRemoveLoading] = useState(true)

    const saveContract = async (e) => {
        e.preventDefault()

        setRemoveLoading(false)

        try {
          const docRef = await addDoc(collection(db, "users", user.uid, "contracts"), {
            name: nameArtist,
            image: imageArtist,
            genre: genreArtist,
            cache: cache,
            date: date,
            address: address
          });
          console.log("Document written with ID: ", docRef.id);
          setOpen(true)
          setRemoveLoading(true)
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {

        getTokenApi()

        const searchUrl = `https://api.spotify.com/v1/artists/${idArtist}`;

        const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenApi}`
        }
        };

        fetch(searchUrl, requestOptions)
        .then(response => response.json())
        .then(artist => {
            // A resposta contém informações sobre os artistas correspondentes ao nome pesquisado.
            setNameArtist(artist.name)
            if(artist.images[0]) {
                setImageArtist(artist.images[0].url)
            } else {
                setImageArtist(userIcon)
            }

            if(artist.genres[0]) {
                setGenreArtist(artist.genres[0])
            } else {
                setGenreArtist('Desconhecido')
            }
            
            
        })
        .catch(error => {
            console.error('Erro ao pesquisar o artista:', error);
        });
    }, [])

  return (
    <div className={styles.contract}>
        <img src={backIcon} alt="" className={styles.back} onClick={() => window.history.back()}/>
        <h1>Contrato</h1>
        <p>Os campos com <span>*</span> são obrigatórios</p>
        <div>
            <img src={imageArtist} alt="Image artist" />
            <div className={styles.artistInfo}>
                <h2>Nome: {nameArtist}</h2>
                <h3>Gênero: {genreArtist}</h3>
            </div>
        </div>
        <form onSubmit={saveContract}>
            <h2>Cachê (Digite só os números e a vírgula)<span>*</span></h2>
            <input type="number" placeholder='Informe o cachê do artista' onChange={(e) => setCache(e.target.value)} required />
            <h2>Data do evento <span>*</span></h2>
            <input type="date" onChange={(e) => setDate(e.target.value)} required />
            <h2>Endereço do evento <span>*</span></h2>
            <input type="text" placeholder='Informe o endereço do evento' onChange={(e) => setAddress(e.target.value)} required/>
            <button type="submit">Finalizar</button>
            {!removeLoading && <Loading />}
            <ModalContractFinalized isOpen={open} />
        </form>
    </div>
  )
}
