import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import searchIcon from '../../../assets/search_icon.png'
import styles from './Main.module.css'
import { ModalSearch } from '../../../components/modal/ModalSearch/ModalSearch'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../components/config/FirebaseConfig'
import { AuthContext } from '../../../contexts/AuthProvider'
import { Loading } from '../../../components/loading/Loading'

export const Main = () => {

  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [contracts, setContracts] = useState('')
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

  useEffect(() => {
    getContracts()
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
            {contracts > [0] ? contracts.map((contract, index) => (
              <Link to={`/mycontracts/${contract.id}`} className={styles.contracts} key={index}>
              <div className={styles.artistName}>
                <img src={contract.image} alt="Imagem" />
                <h2>{contract.name}</h2>
              </div>
              <h3>Cachê: <span>R$ {contract.cache}</span></h3>
              <h3>Data: <span>{contract.date}</span></h3>
            </Link>
              )) : <div className={styles.addContract} onClick={() => setOpen(!open)}>
                <h2>+</h2>
                <h3>Adicione um <br/>contrato</h3>
              </div>}
              {!removeLoading && <Loading />}
        </div>
    </main>
  )
}
