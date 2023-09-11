import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import searchIcon from '../../../assets/search_icon.png'
import styles from './Main.module.css'
import { ModalSearch } from '../../../components/modal/ModalSearch'

export const Main = () => {

  const [open, setOpen] = useState(false)

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
            {/* <div className={styles.addContract} onClick={() => setOpen(!open)}>
              <h2>+</h2>
              <h3>Adicione um <br/>contrato</h3>
            </div>  */}
            <div className={styles.contracts}>
              <div className={styles.artistName}>
                <img src="https://lh3.googleusercontent.com/a/ACg8ocIR8DC20aNHG3BIlV5ykjg-KtM3ssfpm4waaCsdOhz6iw=s96-c" alt="" />
                <h2>Nome do artistaffffffffffffffffff</h2>
              </div>
              <h3>Cachê: <span>R$ 5.000,00</span></h3>
              <h3>Data: <span>10/09/2023</span></h3>
            </div>
            <div className={styles.contracts}>
              <div className={styles.artistName}>
                <img src="https://lh3.googleusercontent.com/a/ACg8ocIR8DC20aNHG3BIlV5ykjg-KtM3ssfpm4waaCsdOhz6iw=s96-c" alt="" />
                <h2>Nome do artista teste</h2>
              </div>
              <h3>Cachê: <span>R$ 5.000,00</span></h3>
              <h3>Data: <span>10/09/2023</span></h3>
            </div>
            <div className={styles.contracts}>
              <div className={styles.artistName}>
                <img src="https://lh3.googleusercontent.com/a/ACg8ocIR8DC20aNHG3BIlV5ykjg-KtM3ssfpm4waaCsdOhz6iw=s96-c" alt="" />
                <h2>Nome</h2>
              </div>
              <h3>Cachê: <span>R$ 5.000,00</span></h3>
              <h3>Data: <span>10/09/2023</span></h3>
            </div>
            <div className={styles.contracts}>
              <div className={styles.artistName}>
                <img src="https://lh3.googleusercontent.com/a/ACg8ocIR8DC20aNHG3BIlV5ykjg-KtM3ssfpm4waaCsdOhz6iw=s96-c" alt="" />
                <h2>Nome do artistaffffffffffffffffff</h2>
              </div>
              <h3>Cachê: <span>R$ 5.000,00</span></h3>
              <h3>Data: <span>10/09/2023</span></h3>
            </div>
            <div></div>
        </div>
    </main>
  )
}
