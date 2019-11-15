import React from 'react'
import { Helmet } from 'react-helmet'
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

const Layout = ({ title, children, featuredContent, noSidebar }) => {

  return <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Helmet defer={false}>
      <html lang="zh-Hans" prefix="og: http://ogp.me/ns#"/>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
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
