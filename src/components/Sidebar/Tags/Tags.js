import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { useTagsList } from '../../../hooks'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(.5, 1),
    backgroundColor: grey[200],
  },
  listBox: {
    padding: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
  },
  tagLink: {
    margin: theme.spacing(0, 3, .5, 0),
  },
  activeLink: {
    color: theme.palette.action.active,
  },
}))
const Tags = (props) => {
  const classes = useStyles()
  const tagsList = useTagsList()
    .map(tag => ({ ...tag, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, 20)
  const windowGlobal = typeof window !== 'undefined' && window

  return <Box {...props}>
    <Box className={classes.title}>
      <Typography variant="subtitle1">标签</Typography>
      <IconButton component={GatsbyLink} to={'/tags'} aria-label="more" size="small" title={'全部'}>
        <MoreHorizIcon/>
      </IconButton>
    </Box>
    <Box className={classes.listBox}>
      {tagsList.map((tag, index) =>
        <Link component={GatsbyLink} to={`/tag/${kebabCase(tag.fieldValue)}/`}
              variant="body1" noWrap key={index}
              className={classes.tagLink + (get(windowGlobal, 'location.pathname') === encodeURI(`/tag/${kebabCase(tag.fieldValue)}/`) ? ` ${classes.activeLink}` : '')}>
          {tag.fieldValue}
        </Link>)}
    </Box>
  </Box>
}

export default Tags
