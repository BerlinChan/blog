import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { PAGINATION } from '../../constants'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

const Pagination = ({ prevPageName, nextPageName, prevPagePath, nextPagePath }) => {

  return (
    <Grid container justify="space-between">
      <Grid item>
        {prevPagePath ?
          <Link component={GatsbyLink} rel="prev" to={prevPagePath} variant='h6'>
            ← {prevPageName ? prevPageName : PAGINATION.PREV_PAGE}</Link> : null}
      </Grid>
      {nextPagePath ?
        <Link component={GatsbyLink} rel="next" to={nextPagePath} variant='h6'>
          {nextPageName ? nextPageName : PAGINATION.NEXT_PAGE} →</Link> : null}
    </Grid>
  )
}

export default Pagination
