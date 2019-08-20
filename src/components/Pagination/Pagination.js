import React from 'react'
import { Link } from 'gatsby'
import { PAGINATION } from '../../constants'
import styles from './Pagination.module.scss'

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage,
}) => {

  return (
    <div className={styles['pagination']}>
      {hasPrevPage ? <div className={styles['pagination__prev']}>
        <Link rel="prev" to={prevPagePath} className={styles['pagination__prev-link']}>
          {PAGINATION.PREV_PAGE}</Link>
      </div> : null}
      {hasNextPage ? <div className={styles['pagination__next']}>
        <Link rel="next" to={nextPagePath} className={styles['pagination__next-link']}>
          {PAGINATION.NEXT_PAGE}</Link>
      </div> : null}
    </div>
  )
}

export default Pagination
