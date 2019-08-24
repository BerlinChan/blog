import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useCategoriesList } from '../../../hooks'
import kebabCase from 'lodash/kebabCase'
import Box from '@material-ui/core/Box'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(1),
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

  return <Box {...props}>
    <Typography variant="subtitle1" className={classes.title}>分类</Typography>
    {categories.map((category, index) =>
      <Link component={GatsbyLink} to={`/category/${kebabCase(category.fieldValue)}/`}
            display="block" variant="body1" noWrap key={index}
            className={classes.link} activeClassName={classes.activeLink}>
        {`${category.fieldValue} (${category.totalCount})`}
      </Link>)}
  </Box>
}

export default Categories
