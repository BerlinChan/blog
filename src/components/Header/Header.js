import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Slide from '@material-ui/core/Slide'
import { useSiteMetadata } from '../../hooks'
import { withPrefix, Link as GatsbyLink } from 'gatsby'
import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger'

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
    flexShrink: 0,
  },
  toolbar: {},
  toolbarTitle: {
    color: theme.palette.primary.main,
    flex: 1,
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}))
const HideOnScroll = (props) => {
  const { children } = props
  const trigger = useScrollTrigger({
    threshold: 400,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default (props) => {
  const classes = useStyles()
  const { title: siteTitle, author: { name, photo }, menu } = useSiteMetadata()

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
            {menu.map((item, index) => (
              <React.Fragment key={index}>
                {item.path ?
                  <Link component={GatsbyLink} color="inherit" noWrap variant="body1" className={classes.toolbarLink}
                        to={item.path}>
                    {item.label}
                  </Link>
                  : <Link color="inherit" noWrap variant="body1" className={classes.toolbarLink}
                          target={'_blank'} rel="noopener" href={item.link}>
                    {item.label}
                  </Link>}
              </React.Fragment>))}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar/>
    </React.Fragment>
  )
}
