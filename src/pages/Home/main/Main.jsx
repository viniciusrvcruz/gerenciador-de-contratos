import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import searchIcon from '../../../assets/search_icon.png'
import styles from './Main.module.css'
import { ModalSearch } from '../../../components/modal/ModalSearch/ModalSearch'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../components/config/FirebaseConfig'
import { AuthContext } from '../../../contexts/AuthProvider'
import { Loading } from '../../../components/loading/Loading'
import { ArtistItem } from '../../../components/artistItem/ArtistItem'
import { ContractItem } from '../../../components/contractItem/ContractItem'

export const Main = () => {

  const { user, tokenApi, getTokenApi } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [contracts, setContracts] = useState('')
  const [result, setResult] = useState('')
  const [removeLoading, setRemoveLoading] = useState(false)

  const getContracts = async () => {
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "contracts"));

        const contractsRes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setContracts(contractsRes)
        setRemoveLoading(true)
  }

  const resultTopArtists = async () => {    

    setRemoveLoading(false)
    getTokenApi()

    const artistIds = ['4fdCGYM7dtJLa3LvR1ccto', '2aKyKSggb31Kw9s9i3iXoo', '2tswayWsUGjUwpvN8KRwuN', '4AeWCU2yUgVFbqKmOezL75'];

    const searchUrl = `https://api.spotify.com/v1/artists?ids=${encodeURIComponent(artistIds)}`;
    
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenApi}`
        }
    }
    
    await fetch(searchUrl, requestOptions)
    .then(response => response.json())
    .then(artist => {
        // The response contains information about the artists corresponding to the searched id.
        setResult(artist)
        setRemoveLoading(true)
    })
    .catch(error => {
        console.error('Erro ao pesquisar o artista:', error);
    });
}

  useEffect(() => {
    getContracts()
    resultTopArtists()
  }, [])

  return (
    <main className={styles.main}>
        <div className={styles.search}>
            <h1>Pesquise por artistas ou bandas</h1>
            <div onClick={() => setOpen(!open)}>
                <img src={searchIcon} alt="Search icon" />
                <span>Pesquise por artistas ou bandas</span>
            </div>
        </div>
        <ModalSearch isOpen={open} setOpen={setOpen}/>
        <h2>Meus contratos</h2>
        <div className={styles.myContracts}>   
            {contracts.length > 0 ? (contracts.map((contract, index) => (
              <Link to={`/mycontracts/${contract.id}`} className={styles.contracts} key={index}>
                <ContractItem contract={contract}/>
            </Link>
              ))) : (<div className={styles.addContract} onClick={() => setOpen(!open)}>
                <h2>+</h2>
                <h3>Adicione um <br/>contrato</h3>
              </div>)}
              {!removeLoading && <Loading />}
        </div>
        <h2>Top Artistas Gospel</h2>
        <div className={styles.topArtists}>
        {result && result.artists &&  result.artists.map((artist, index) => (
              <Link to={`/contract/${artist.id}`} className={styles.topArtist} key={index}>
                <ArtistItem artist={artist} />
              </Link>
                ))}
              {!removeLoading && <Loading />}
        </div>
    </main>
  )
}
