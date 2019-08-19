import React from 'react'
import Helmet from 'react-helmet'
import styles from './Layout.module.scss'

const Layout = ({ children, title, description }) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta property="og:site_name" content={title}/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title" content={title}/>
    </Helmet>
    {children}
  </div>
)

export default Layout
