import React from 'react'
import styles from './Footer.module.css'
import instagramIcon from '../../assets/instagram_icon.png'
import facebookIcon from '../../assets/facebook_icon.png'
import linkedinIcon from '../../assets/linkedin_icon.png'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
        <ul>
            <li><a href="https://www.instagram.com/enterscience_br/" target='target_blank'><img src={instagramIcon} /></a></li>
            <li><a href="https://www.facebook.com/enterscience" target='target_blank'><img src={facebookIcon} /></a></li>
            <li><a href="https://www.linkedin.com/company/enterscience/" target='target_blank'><img src={linkedinIcon} /></a></li>
        </ul>
        <p>Copyrights © 2023 <span>All Rights Reserved by ES Inc.</span></p>
    </footer>
  )
}
