import React, { useContext, useEffect, useState } from 'react'
import backIcon from '../../assets/arrow_back_icon.png'
import { AuthContext } from '../../contexts/AuthProvider'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../components/config/FirebaseConfig'
import styles from './ContractSelected.module.css'
import { ModalConfirmDel } from '../../components/modal/ModalContractDel/ModalContractDel'
import { Loading } from '../../components/loading/Loading'

export const ContractSelected = () => {
    const { user } = useContext(AuthContext)
    const { idContract } = useParams();
    const [contract, setContract] = useState('')
    const [open, setOpen] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)


    const getContracts = async () => {
        const docRef = doc(db, "users", user.uid, "contracts", idContract);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setContract(docSnap.data())
            setRemoveLoading(true)
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
    }

    useEffect(() => {
        getContracts()
    }, [])

    if(contract) {
        return (
            <div className={styles.contract}>
                <img src={backIcon} alt="Back icon" className={styles.back} onClick={() => window.history.back()}/>
                <h1>Contrato</h1>
                <div>
                    <img src={contract.image} alt="Image artist" />
                    <div className={styles.artistInfo}>
                        <h2>Nome: {contract.name}</h2>
                        <h3>Gênero: {contract.genre}</h3>
                    </div>
                </div>
                <section>
                    <h2>Cachê</h2>
                    <h3>R$ {contract.cache}</h3>
                    <h2>Data do evento</h2>
                    <h3>{contract.date}</h3>
                    <h2>Endereço do evento</h2>
                    <h3>{contract.address}</h3>
                    <button onClick={() => setOpen(!open)}>Excluir Contrato</button>
                    <ModalConfirmDel user={user} idContract={idContract} isOpen={open} setOpen={setOpen} nameArtist={contract.name} />
                </section>
            </div>
          )
    } else {
        return <Loading />
    }
 
}
