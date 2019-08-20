import React from 'react'
import Helmet from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
// import styles from './Layout.module.scss'

const Layout = ({ children, title, description }) => (
  <React.Fragment>
    <CssBaseline/>
    <Helmet>
      <html lang="zh-Hans"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta property="og:site_name" content={title}/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title" content={title}/>
    </Helmet>
    <Container maxWidth="lg">
      {children}
    </Container>
  </React.Fragment>
)

export default Layout
