import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { useCategoriesList, useSiteMetadata } from '../../../hooks'
import { makeStyles } from '@material-ui/core'
import kebabCase from 'lodash/kebabCase'

const useStyles = makeStyles(theme => ({
  menuDropdown: {
    width: 200,
  },
  menuLink: {
    width: '100%',
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
    <Link component={GatsbyLink} to={`/page`} noWrap variant="body1"
          underline="none" className={classes.toolbarLink} activeClassName={classes.activeLink}
          aria-haspopup="true" aria-controls="menu-list-grow"
          onMouseEnter={e => setAnchorEl(e.currentTarget)}
    >文章</Link>
    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition disablePortal>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: 'center bottom' }}>
          <Paper id="menu-list-grow" onMouseLeave={handleArticleMenuClose}>
            <ClickAwayListener onClickAway={handleArticleMenuClose}>
              <MenuList className={classes.menuDropdown}>
                {categories.map((category, index) => <MenuItem key={index}>
                  <Link component={GatsbyLink} to={`/category/${kebabCase(category.fieldValue)}/`}
                        display="block" underline={'none'}
                        className={classes.menuLink} activeClassName={classes.activeLink} noWrap>
                    {category.fieldValue}
                  </Link>
                </MenuItem>)}
                <MenuItem>
                  <Link component={GatsbyLink} to={`/archivedBlogPage/`}
                        display="block" underline={'none'}
                        className={classes.menuLink} activeClassName={classes.activeLink} noWrap>存档文章</Link>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>

    {menu.map((item, index) => (
      <React.Fragment key={index}>
        {item.path ?
          <Link component={GatsbyLink} to={item.path} activeClassName={classes.activeLink}
                noWrap variant="body1" className={classes.toolbarLink} underline="none">
            {item.label}
          </Link>
          : <Link noWrap variant="body1" className={classes.toolbarLink}
                  target={'_blank'} rel="noopener" href={item.link} underline="none">
            {item.label}
          </Link>}
      </React.Fragment>))}
  </React.Fragment>
}
