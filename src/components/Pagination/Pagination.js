import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { PAGINATION } from '../../constants'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  nextNav: {
    marginLeft: 'auto',
  },
}))
const Pagination = ({ prevPageName, nextPageName, prevPagePath, nextPagePath }) => {
  const classes = useStyles()

  return (
    <Grid container justify="space-between" wrap="nowrap">
      {prevPagePath ? <Grid item>
        <Link component={GatsbyLink} rel="prev" to={prevPagePath} variant='h6'>
          ← {prevPageName ? prevPageName : PAGINATION.PREV_PAGE}</Link>
      </Grid> : null}
      {nextPagePath ? <Grid item className={classes.nextNav}>
        <Link component={GatsbyLink} rel="next" to={nextPagePath} variant='h6'>
          {nextPageName ? nextPageName : PAGINATION.NEXT_PAGE} →</Link>
      </Grid> : null}
    </Grid>
  )
}

export default Pagination
