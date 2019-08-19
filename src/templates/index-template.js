import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import FeedWordpress from '../components/FeedWordpress'
import Page from '../components/Page'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'
import archivedWordpressData from '../utils/archived-wordpress-data'

const IndexTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
  } = pageContext

  const { edges } = data.allMarkdownRemark
  const pageTitle = currentPage > 0
    ? `Posts - Page ${currentPage} - ${siteTitle}`
    : siteTitle

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar isIndex/>
      <Page>
        <Feed edges={edges}/>
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
        {!hasNextPage ? <Fragment>
          <hr/>
          <div>2019年8月之前的文章，从 Wordpress 迁移来</div>
          <FeedWordpress edges={archivedWordpressData.allWordpressPost.edges}/>
        </Fragment> : null}
      </Page>
    </Layout>
  )
}

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`

export default IndexTemplate
