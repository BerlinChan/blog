import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Slide from '@material-ui/core/Slide'
import Hidden from '@material-ui/core/Hidden'
import Menu from '../Menu'
import MenuDraw from '../MenuDraw'
import { useSiteMetadata } from '../../../hooks'
import { Link as GatsbyLink, withPrefix } from 'gatsby'
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  toolbarMenu: {
    marginLeft: 'auto',
  },
  toolbarHolder: {
    marginBottom: theme.spacing(3),
  },
}))
const HideOnScroll = (props) => {
  const { children } = props
  const trigger = useScrollTrigger({
    threshold: 400,
  })
  const triggerElevation = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {React.cloneElement(children, {
        elevation: triggerElevation ? 4 : 0,
      })}
    </Slide>
  )
}

const Header = (props) => {
  const [openDraw, setOpenDraw] = React.useState(false)
  const theme = useTheme()
  const classes = useStyles()
  const { title: siteTitle, author: { name, photo } } = useSiteMetadata()

  return (
    <React.Fragment>
      <HideOnScroll  {...props}>
        <AppBar color={'default'}>
          <Toolbar className={classes.toolbar}>
            <Link component={GatsbyLink} to={withPrefix('/')} className={classes.avatar}>
              <Avatar alt={name} src={photo}/>
            </Link>
            <Link component={GatsbyLink} to={withPrefix('/')} className={classes.toolbarTitle} underline="none">
              <Typography component="h2" variant="h5" color="inherit" align="left" noWrap>
                {siteTitle}
              </Typography>
            </Link>
            <Box className={classes.toolbarMenu}>
              <Hidden xsDown>
                <Menu/>
              </Hidden>
              <Hidden smUp>
                <IconButton edge="end" color="inherit" aria-label="menu"
                            onClick={() => setOpenDraw(true)}>
                  <MenuIcon color={'primary'}/>
                </IconButton>
              </Hidden>
              {theme.palette.type === 'light'
                ? <IconButton color="primary" aria-label="Activate dark mode"
                              onClick={() => props.setColorMode('dark')}>
                  <Brightness4Icon/>
                </IconButton>
                : <IconButton color="primary" aria-label="Activate light mode"
                              onClick={() => props.setColorMode('light')}>
                  <BrightnessHighIcon/>
                </IconButton>}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar className={classes.toolbarHolder}/>
      <MenuDraw openDraw={openDraw} setOpenDraw={setOpenDraw}/>
    </React.Fragment>
  )
}

export default Header
