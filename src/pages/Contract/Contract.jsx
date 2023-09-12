import React, { useContext, useEffect, useState } from 'react'
import styles from './Contract.module.css'
import { AuthContext } from '../../contexts/authProvider'
import { useParams } from 'react-router-dom'
import userIcon from '../../assets/user_icon.png'
import backIcon from '../../assets/arrow_back_icon.png'
import { ModalContractFinalized } from '../../components/modal/ModalContractFinalized'

export const Contract = () => {
    const { tokenApi, getTokenApi } = useContext(AuthContext)
    const { idArtist } = useParams();

    const [open, setOpen] = useState(false)
    const [nameArtist, setNameArtist] = useState('')
    const [imageArtist, setImageArtist] = useState('')
    const [genreArtist, setGenreArtist] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {

        if (!tokenApi || !tokenApi.expires_in) {
            getTokenApi()
        }

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
        <form>
            <h2>Cachê <span>*</span></h2>
            <input type="text" placeholder='Informe o cachê do artista' required/>
            <h2>Data do evento <span>*</span></h2>
            <input type="date" required onChange={(e) => setDate(e.target.value)}/>
            <h2>Endereço do evento <span>*</span></h2>
            <input type="text" placeholder='Informe o endereço do evento' required/>
            <button type="submit">Finalizar</button>
        </form>
        <ModalContractFinalized isOpen={open} setOpen={setOpen} />
    </div>
  )
}
