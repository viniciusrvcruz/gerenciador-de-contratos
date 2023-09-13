import React from 'react'
import styles from './Loading.module.css'
import loading from '../../assets/loading.svg'

export const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
        <img src={loading} alt="Loader" />
    </div>
  )
}
