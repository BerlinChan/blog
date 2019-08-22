import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import { useSiteMetadata, useCategoriesList } from '../../../hooks'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}))

const Menu = (props) => {
  const classes = useStyles()
  const { menu } = useSiteMetadata()

  return <React.Fragment>
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
  </React.Fragment>
}

export default Menu
