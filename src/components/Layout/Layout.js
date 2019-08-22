import React from 'react'
import Helmet from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import deepOrange from '@material-ui/core/colors/deepOrange'
import amber from '@material-ui/core/colors/amber'
import Header from '../Header'
import Footer from '../Footer'
import ScrollTop from '../ScrollTop'

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: amber,
  },
})

const Layout = ({ children, title, description }) => (
  <ThemeProvider theme={theme}>
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
      <Header/>
      <Container maxWidth="lg">
        <Box my={2}>
          {children}
        </Box>
        <Footer/>
      </Container>
      <ScrollTop/>
    </React.Fragment>
  </ThemeProvider>
)

export default Layout
