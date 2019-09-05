import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import { brown, deepOrange } from '@material-ui/core/colors'
import Header from './Header'
import Footer from './Footer'
import ScrollTop from './ScrollTop'
import Grid from '@material-ui/core/Grid'
import Sidebar from '../Sidebar/Sidebar'

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: brown,
  },
})

const Layout = ({ title, description, children, featuredContent, noSidebar }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  })

  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Helmet>
      <html lang="zh-Hans" prefix="og: http://ogp.me/ns#"/>
      <title>{title}</title>
      <meta name="description" content={description}/>
    </Helmet>
    <Header/>
    <Container maxWidth="lg">
      {featuredContent}
      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          {children}
        </Grid>
        {noSidebar ? null :
          <Grid item xs={12} md={4}>
            <Sidebar/>
          </Grid>}
      </Grid>
      <Footer/>
    </Container>
    <ScrollTop/>
  </ThemeProvider>
}

export default Layout
