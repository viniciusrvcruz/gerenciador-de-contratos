import React, { useState } from 'react'
import styles from './ModalContractDel.module.css'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { Loading } from '../../../components/loading/Loading';

export const ModalConfirmDel = ({user, idContract, isOpen, setOpen, nameArtist}) => {

    const [removeLoading, setRemoveLoading] = useState(true)

    const delContract = async () => {
        setRemoveLoading(false)

        await deleteDoc(doc(db, "users", user.uid, "contracts", idContract));
        try {
            setRemoveLoading(true)
            window.history.back()
        } catch {
            alert('Não foi possivel excluir o contrato!')
        }
        
    }

    if (isOpen) {
        return (
            <div className={styles.modalConfirmDel} onClick={() => setOpen(!isOpen)}>
                <div onClick={(e) => e.stopPropagation()}>
                    <h2>Deseja excluir o contrato com "{nameArtist}"?</h2>
                    <div className={styles.buttons}>
                        <button onClick={() => setOpen(!isOpen)} className={styles.cancel}>Cancelar</button>
                        <button onClick={delContract}>Confirmar</button>
                    </div>
                    {!removeLoading && <Loading />}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}
