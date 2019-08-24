import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useTagsList } from '../../../hooks'
import kebabCase from 'lodash/kebabCase'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(1),
    backgroundColor: grey[200],
  },
  link: {
    marginRight: theme.spacing(3),
  },
  listBox: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  activeLink: {
    color: theme.palette.action.active,
  },
}))
const Tags = (props) => {
  const classes = useStyles()
  const tagsList = useTagsList()

  return <Box {...props}>
    <Typography variant="subtitle1" className={classes.title}>标签</Typography>
    <Box className={classes.listBox}>
      {tagsList.map((tag, index) =>
        <Link component={GatsbyLink} to={`/tag/${kebabCase(tag.fieldValue)}/`}
              variant="body1" noWrap key={index}
              className={classes.link} activeClassName={classes.activeLink}>
          {tag.fieldValue}
        </Link>)}
    </Box>
  </Box>
}

export default Tags
