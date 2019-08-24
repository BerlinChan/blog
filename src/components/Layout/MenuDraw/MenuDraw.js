import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useSiteMetadata, useCategoriesList } from '../../../hooks'
import { makeStyles } from '@material-ui/core'
import kebabCase from 'lodash/kebabCase'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(theme => ({
  menuDrawer: {
    width: 260,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activeLink: {
    color: theme.palette.action.active
  },
}))

export default () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { menu } = useSiteMetadata()
  const categories = useCategoriesList()

  return <React.Fragment>
    <IconButton edge="end" color="inherit" aria-label="menu"
                onClick={() => setOpen(true)}>
      <MenuIcon/>
    </IconButton>

    <SwipeableDrawer anchor="right" open={open}
                     onClose={() => setOpen(false)}
                     onOpen={() => setOpen(true)}>
      <List component="nav" className={classes.menuDrawer}
            aria-labelledby="nested-list-subheader"
            subheader={<ListSubheader component="div" id="nested-list-subheader">导航</ListSubheader>}
      >
        <ListItem button component={GatsbyLink} to={`/page`} activeClassName={classes.activeLink}>
          <ListItemText primary="文章"/>
        </ListItem>
        {categories.map((category, index) =>
          <ListItem button component={GatsbyLink}
                    to={`/category/${kebabCase(category.fieldValue)}/`}
                    activeClassName={classes.activeLink}
                    key={index} className={classes.nested}>
            <ListItemText primary={category.fieldValue}/>
          </ListItem>)}

        {menu.map((item, index) => (
          <React.Fragment key={index}>
            {item.path ?
              <ListItem button component={GatsbyLink} to={item.path} activeClassName={classes.activeLink}>
                <ListItemText primary={item.label}/>
              </ListItem>
              : <ListItem button component={Link} target={'_blank'} rel="noopener" href={item.link}>
                <ListItemText primary={item.label}/>
              </ListItem>}
          </React.Fragment>))}
      </List>
    </SwipeableDrawer>
  </React.Fragment>
}
