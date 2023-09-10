import React, { useContext, useEffect, useState } from 'react'
import styles from './ModalSearch.module.css'
import searchIcon from '../../assets/search_icon.png'
import backIcon from '../../assets/arrow_back_icon.png'
import { AuthContext } from '../../contexts/authProvider'

export const ModalSearch = ({ isOpen, setOpen }) => {

    const { tokenApi, getTokenApi } = useContext(AuthContext)
    const [nameArtist, setNameArtist] = useState('')
    const [result, setResult] = useState('')

    const resultSearchArtist = async () => {

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
        console.log(data);
        const artists = data.artists.items
        console.log(data.artists.items);
        setResult(artists)
        result.forEach((e) => {
            console.log('nome', e.name)
        })
      })
      .catch(error => {
        console.error('Erro ao pesquisar o artista:', error);
      });
    }

    useEffect(() => {
        setResult('')
    }, [isOpen])

    if (isOpen) {
        return (
            <div className={styles.modalSearch}>
                <div className={styles.modalSearchContainer}>
                    <div>
                        <img src={backIcon} alt="back Icon" onClick={() => setOpen(!isOpen)} />
                        <input type="text" placeholder='Pesquise por artista ou banda' onChange={(e) => setNameArtist(e.target.value)}/>
                        <img src={searchIcon} alt="Search Icon" onClick={resultSearchArtist} />
                    </div>
                    <section className={styles.resultSearch}>
                        {result && result.map((artist) => (
                            <div>
                            <img src={artist.images[0] ? artist.images[0].url : "https://lh3.googleusercontent.com/a/ACg8ocIR8DC20aNHG3BIlV5ykjg-KtM3ssfpm4waaCsdOhz6iw=s96-c"} alt="Image" />
                            <div className={styles.artistName}>
                                <h3>{artist.name}</h3>
                                <h3>Seguidores: {artist.followers ? artist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 'Indefinido'}</h3>
                            </div>
                        </div>
                        ))}
                    </section>
                </div>
            </div>
        )
    } else {
        <></>
    }

}
