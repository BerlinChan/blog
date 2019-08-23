import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import { withPrefix, Link as GatsbyLink } from 'gatsby'
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger'

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
      textDecoration: 'none',
    },
  },
  toolbarMenu: {
    marginLeft: 'auto',
  },
  toolbarBottom: {
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

export default (props) => {
  const classes = useStyles()
  const { title: siteTitle, author: { name, photo } } = useSiteMetadata()

  return (
    <React.Fragment>
      <HideOnScroll  {...props}>
        <AppBar color={'default'}>
          <Toolbar className={classes.toolbar}>
            <Link component={GatsbyLink} to={withPrefix('/')} className={classes.avatar}>
              <Avatar alt={name} src={withPrefix(photo)}/>
            </Link>
            <Link component={GatsbyLink} to={withPrefix('/')} className={classes.toolbarTitle}>
              <Typography component="h2" variant="h5" color="inherit" align="left" noWrap>
                {siteTitle}
              </Typography>
            </Link>
            <Box className={classes.toolbarMenu}>
              <Hidden xsDown>
                <Menu/>
              </Hidden>
              <Hidden smUp>
                <MenuDraw/>
              </Hidden>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar className={classes.toolbarBottom}/>
    </React.Fragment>
  )
}
