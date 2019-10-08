import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useCategoriesList, useSiteMetadata } from '../../../hooks'
import { makeStyles } from '@material-ui/core'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'
import Link from '@material-ui/core/Link'
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

export default ({ openDraw, setOpenDraw }) => {
  const classes = useStyles()
  const { menu } = useSiteMetadata()
  const categories = useCategoriesList()
  const windowGlobal = typeof window !== 'undefined' && window

  return <SwipeableDrawer anchor="right" open={openDraw}
                          onClose={() => setOpenDraw(false)}
                          onOpen={() => setOpenDraw(true)}>
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
                  className={classes.nested + (get(windowGlobal, 'location.pathname') === encodeURI(`/category/${kebabCase(category.fieldValue)}/`) ? ` ${classes.activeLink}` : '')}
                  key={index}>
          <ListItemText primary={category.fieldValue}/>
        </ListItem>)}
      <ListItem button component={GatsbyLink}
                to={`/archivedBlogPage/`}
                activeClassName={classes.activeLink}
                className={classes.nested}>
        <ListItemText primary={'存档文章'}/>
      </ListItem>

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
}
