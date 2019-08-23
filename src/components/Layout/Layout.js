import React from 'react'
import Helmet from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import deepOrange from '@material-ui/core/colors/deepOrange'
import orange from '@material-ui/core/colors/orange'
import Header from './Header'
import Footer from './Footer'
import ScrollTop from './ScrollTop'
import Grid from '@material-ui/core/Grid'
import Sidebar from '../Sidebar/Sidebar'

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: orange,
  },
})

const Layout = ({ title, description, children, featuredContent }) => {

  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Helmet>
      <html lang="zh-Hans"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta property="og:site_name" content={title}/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title" content={title}/>
    </Helmet>
    <Header/>
    <Container maxWidth="lg">
      <main>
        {featuredContent}
        <Grid container spacing={5}>
          <Grid item sm={12} md={8}>
            {children}
          </Grid>
          <Grid item sm={12} md={4}>
            <Sidebar/>
          </Grid>
        </Grid>
      </main>
      <Footer/>
    </Container>
    <ScrollTop/>
  </ThemeProvider>
}

export default Layout
