import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './ModalSearch.module.css'
import searchIcon from '../../../assets/search_icon.png'
import backIcon from '../../../assets/arrow_back_icon.png'
import userIcon from '../../../assets/user_icon.png'
import { AuthContext } from '../../../contexts/AuthProvider'
import { Link } from 'react-router-dom'
import { Loading } from '../../../components/loading/Loading'

export const ModalSearch = ({ isOpen, setOpen }) => {

    const { tokenApi, getTokenApi } = useContext(AuthContext)
    const inputRef = useRef(null);
    const [nameArtist, setNameArtist] = useState('')
    const [result, setResult] = useState('')
    const [removeLoading, setRemoveLoading] = useState(true)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // Chame sua função aqui
          resultSearchArtist();
        }
      };

    const resultSearchArtist = async () => {    

        setRemoveLoading(false)
        console.log('teste', !tokenApi.expires_in)
        if (!tokenApi || !tokenApi.expires_in) {
            getTokenApi()
        }
    
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(nameArtist)}&type=artist`;
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenApi}`
            }
        }
        
        fetch(searchUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // A resposta contém informações sobre os artistas correspondentes ao nome pesquisado.
            console.log(data)
            const artists = data.artists.items
            setResult(artists)
            setRemoveLoading(true)
        })
        .catch(error => {
            console.error('Erro ao pesquisar o artista:', error);
        });
    }

    useEffect(() => {
        setResult('')
        if(isOpen){
            inputRef.current.focus();
        }
        
    }, [isOpen])

    if (isOpen) {
        return (
            <div className={styles.modalSearch}>
                <div className={styles.modalSearchContainer}>
                    <div>
                        <img src={backIcon} alt="back Icon" onClick={() => setOpen(!isOpen)} />
                        <input type="text" placeholder='Pesquise por artista ou banda' onChange={(e) => setNameArtist(e.target.value)} ref={inputRef} onKeyDown={handleKeyDown}/>
                        <button className={styles.searchButton} onClick={resultSearchArtist}><img src={searchIcon} alt="Search Icon" /></button>
                    </div>
                    <section className={styles.resultSearch}>
                        {result && result.map((artist, id) => (
                            <Link to={`/contract/${artist.id}`} key={id}>
                                <img src={artist.images[0] ? artist.images[0].url : userIcon} alt="Image" />
                                <div className={styles.artistName}>
                                    <h3>{artist.name}</h3>
                                    <h4>Seguidores: {artist.followers ? artist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 'Indefinido'}</h4>
                                </div>
                            </Link>
                        ))}
                        {!removeLoading && <Loading />}
                    </section>
                </div>
            </div>
        )
    } else {
        return <></>
    }

}
