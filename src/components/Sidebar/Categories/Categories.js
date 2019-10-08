import React from 'react'
import _ from 'lodash'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useCategoriesList } from '../../../hooks'
import kebabCase from 'lodash/kebabCase'
import Box from '@material-ui/core/Box'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(.5, 1),
    backgroundColor: grey[200],
  },
  link: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  activeLink: {
    color: theme.palette.action.active,
  },
}))
const Categories = (props) => {
  const classes = useStyles()
  const categories = useCategoriesList()
  const windowGlobal = typeof window !== 'undefined' && window

  return <Box {...props}>
    <Box className={classes.title}>
      <Typography variant="subtitle1">分类</Typography>
      <IconButton component={GatsbyLink} to={'/categories'} aria-label="more" size="small" title={'全部'}>
        <MoreHorizIcon/>
      </IconButton>
    </Box>
    {categories.map((category, index) =>
      <Link component={GatsbyLink} to={`/category/${kebabCase(category.fieldValue)}/`}
            display="block" variant="body1" noWrap key={index}
            className={classes.link + (_.get(windowGlobal, 'location.pathname') === encodeURI(`/category/${kebabCase(category.fieldValue)}/`) ? ` ${classes.activeLink}` : '')}>
        {`${category.fieldValue} (${category.totalCount})`}
      </Link>)}
  </Box>
}

export default Categories
