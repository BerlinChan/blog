import React, { Fragment } from 'react'
import moment from 'moment'
import { Link } from 'gatsby'
import styles from './FeedWordpress.module.scss'

const FeedWordpress = ({ edges }) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.path}>
        <div className={styles['feed__item-meta']}>
          <time className={styles['feed__item-meta-time']}
                dateTime={moment(edge.node.date).format('YYYY-MM-DD')}>
            {moment(edge.node.date).format('YYYY-MM-DD')}
          </time>
          <span className={styles['feed__item-meta-divider']}/>
          <span className={styles['feed__item-meta-category']}>
            {edge.node.categories.map((item, index) => <Fragment key={index}>
              <span className={styles['feed__item-meta-divider']}/>
              <Link to={item.path}
                    className={styles['feed__item-meta-category-link']}>
                {item.name}
              </Link>
            </Fragment>)}
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']}
                to={edge.node.path}>{edge.node.title}</Link>
        </h2>
        <div className={styles['feed__item-description']}
             dangerouslySetInnerHTML={{
               __html: edge.node.excerpt.replace(
                 /\n<p class="link-more"><a href=".*" class="more-link">继续阅读<span class="screen-reader-text">.*<\/span><\/a><\/p>\n/,
                 '',
               ),
             }}/>
        <Link className={styles['feed__item-readmore']}
              to={edge.node.path}>阅读</Link>
      </div>
    ))}
  </div>
)

export default FeedWordpress
