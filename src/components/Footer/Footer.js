import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link'
import { useSiteMetadata } from '../../hooks'
import SvgIcons from '../../assets/SvgIcons'
import { Link as GatsbyLink } from 'gatsby'

const useStyles = makeStyles(theme => ({
  snsIcon: {
    marginRight: theme.spacing(1),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}))

export default () => {
  const classes = useStyles()
  const { url: siteUrl, author: { contacts }, menu } = useSiteMetadata()

  return (
    <footer className={classes.footer}>
      <Grid container spacing={3}>
        <Hidden smDown>
          <Grid item md={4}>
            <Typography variant="body2" color="textSecondary" align={'center'}>
              {menu.map((item, index) => <React.Fragment key={index}>
                {item.path ?
                  <Link component={GatsbyLink} to={item.path} color="inherit">{item.label}</Link> :
                  <Link href={item.link} target="_blank" rel="noopener" color="inherit">{item.label}</Link>}
                {index < menu.length - 1 ? ' | ' : null}
              </React.Fragment>)}
            </Typography>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={4}>
          <IconButton className={classes.snsIcon} href={contacts.twitter} target="_blank" rel="noopener">
            <SvgIcons name={'twitter'}/>
          </IconButton>
          <IconButton className={classes.snsIcon} href={contacts.youtube} target="_blank" rel="noopener">
            <SvgIcons name={'youtube'}/>
          </IconButton>
          <IconButton className={classes.snsIcon} href={contacts.facebook} target="_blank" rel="noopener">
            <SvgIcons name={'facebook'}/>
          </IconButton>
          <IconButton className={classes.snsIcon} href={contacts.github} target="_blank" rel="noopener">
            <SvgIcons name={'github'}/>
          </IconButton>
          <IconButton className={classes.snsIcon}>
            <SvgIcons name={'wechat'}/>
          </IconButton>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" color="textSecondary">
            <Link color="inherit" href={siteUrl}>
              www.berlinchan.com
            </Link>
            {' 基于 '}
            <Link color="inherit" href="https://www.gatsbyjs.org/" target="_blank" rel="noopener">Gatsby</Link>
            {' 和 '}
            <Link color="inherit" href="https://material-ui.com/" target="_blank" rel="noopener">Material-UI</Link>
            {' 构建，运行在 '}
            <Link color="inherit" href="https://pages.github.com/" target="_blank" rel="noopener">GitHub Pages</Link>
            {' 上。'}
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}
