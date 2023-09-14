import React from 'react'
import styles from './ContractItem.module.css'

export const ContractItem = ({contract}) => {
    return (
        <div className={styles.contractItem}>
            <div>
                <img src={contract.image} alt="Imagem" />
                <h2>{contract.nameArtist}</h2>
            </div>
            <h3>Cachê: <span>R$ {contract.cache}</span></h3>
            <h3>Data: <span>{contract.date}</span></h3>
        </div>
    )
}
