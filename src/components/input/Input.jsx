import React from 'react'
import styles from './Input.module.css'

export const Input = ({type, placeholder, setValue}) => {
  return (
    <input type={type} className={styles.input} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} required />
  )
}
