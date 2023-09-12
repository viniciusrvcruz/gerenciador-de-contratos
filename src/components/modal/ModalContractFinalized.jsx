import React from 'react'
import styles from './ModalContractFinalized.module.css'
import { Link } from 'react-router-dom'

export const ModalContractFinalized = ({isOpen}) => {

    if (isOpen) {
        return (
            <div className={styles.contractFinalized}>
                <div>
                    <h2>Contrato Finalizado com <span>Sucesso!</span></h2>
                    <div className={styles.buttons}>
                        <Link to="/">Ir para o Início</Link>
                        <Link to="/mycontracts">Meus contratos</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }

}
