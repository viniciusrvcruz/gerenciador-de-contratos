import React from 'react'
import { Link } from 'react-router-dom'
import searchIcon from '../../../../assets/search_icon.png'
import styles from './MainHome.module.css'

export const MainHome = () => {
  return (
    <main className={styles.main}>
        <div className={styles.search}>
            <h1>Pesquise por artistas ou bandas:</h1>
            <Link to="#">
                <img src={searchIcon} alt="Search icon" />
                <span>Pesquise por artistas ou bandas</span>
            </Link>
        </div>
    </main>
  )
}
