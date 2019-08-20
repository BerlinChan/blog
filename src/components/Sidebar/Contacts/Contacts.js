import React from 'react'
import styles from './Contacts.module.scss'

const Contacts = ({ contacts }) => (
  <div className={styles['contacts']}>
    <ul className={styles['contacts__list']}>
      <li>contacts</li>
    </ul>
  </div>
)

export default Contacts
