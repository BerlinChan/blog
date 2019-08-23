import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import Popover from '@material-ui/core/Popover'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { useSiteMetadata, useCategoriesList } from '../../../hooks'
import { makeStyles } from '@material-ui/core'
import kebabCase from 'lodash/kebabCase'

const useStyles = makeStyles(theme => ({
  menuDropdown: {
    width: 200,
  },
  toolbarLink: {
    padding: theme.spacing(1),
  },
  activeLink: {
    color: theme.palette.action.active
  },
}))

export default () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { menu } = useSiteMetadata()
  const categories = useCategoriesList()

  function handleArticleMenuClose () {
    setAnchorEl(null)
  }

  return <React.Fragment>
    <Link component={GatsbyLink} to={`/page`} activeClassName={classes.activeLink}
          color="inherit" noWrap variant="body1" className={classes.toolbarLink}
          aria-haspopup="true" aria-owns={anchorEl ? 'mouse-over-popover' : undefined}
          onMouseEnter={e => setAnchorEl(e.currentTarget)}
    >文章
    </Link>
    <Popover open={Boolean(anchorEl)} anchorEl={anchorEl}
             onClose={handleArticleMenuClose}
             anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
             transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <MenuList onMouseLeave={handleArticleMenuClose} className={classes.menuDropdown}>
        {categories.map((category, index) => <MenuItem key={index}>
          <Link to={`/category/${kebabCase(category.fieldValue)}/`} noWrap>
            {category.fieldValue}
          </Link>
        </MenuItem>)}
      </MenuList>
    </Popover>

    {menu.map((item, index) => (
      <React.Fragment key={index}>
        {item.path ?
          <Link component={GatsbyLink} to={item.path} activeClassName={classes.activeLink}
                color="inherit" noWrap variant="body1" className={classes.toolbarLink}>
            {item.label}
          </Link>
          : <Link color="inherit" noWrap variant="body1" className={classes.toolbarLink}
                  target={'_blank'} rel="noopener" href={item.link}>
            {item.label}
          </Link>}
      </React.Fragment>))}
  </React.Fragment>
}
