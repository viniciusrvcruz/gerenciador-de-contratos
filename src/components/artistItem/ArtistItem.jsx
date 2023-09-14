import React from 'react'
import styles from './ArtistItem.module.css'

export const ArtistItem = ({artist}) => {
    return (
        <div className={styles.artistItem}>
            <div>
                <img src={artist.images[0].url} alt="Imagem" />
                <h2>{artist.name}</h2>
            </div>
            <h3>Genêro: <span>{artist.genres[0]}</span></h3>
            <h3>Seguidores: <span>{artist.followers ? artist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 'Indefinido'}</span></h3>
        </div>
    )
}
