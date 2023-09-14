import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../components/config/FirebaseConfig'
import styles from './MyContracts.module.css'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/arrow_back_icon.png'
import { Loading } from '../../components/loading/Loading'

export const MyContracts = () => {

    const { user } = useContext(AuthContext)
    const [contracts, setContracts] = useState('')
    const [removeLoading, setRemoveLoading] = useState(false)

    const getContracts = async () => {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "contracts"));
    
            //setDados(querySnapshot.data().treino)
            const contractsRes = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            setContracts(contractsRes)
            setRemoveLoading(true)
      }

    useEffect(() => {
        getContracts()
    }, [])

  return (
    <div className={styles.myContracts}>
        <Link to="/" ><img src={backIcon} alt="Back icon" className={styles.back} /></Link>
        <h1>Meus Contratos</h1>
        <section className={styles.contractsContainer}>
        {contracts > [0] ? contracts.map((contract, index) => (
              <Link to={`/mycontracts/${contract.id}`} className={styles.contracts} key={index}>
              <div className={styles.artistName}>
                <img src={contract.image} alt="Imagem" />
                <div>
                    <h2>{contract.nameArtist}</h2>
                    <span>{contract.genre}</span>
                </div>
              </div>
              <h3>Cachê: <span>R$ {contract.cache}</span></h3>
              <h3>Data: <span>{contract.date}</span></h3>
            </Link>
              )) : <div>
                Você não tem nenhum contrato
              </div>}
              {!removeLoading && <Loading />}
        </section>
    </div>
  )
}
