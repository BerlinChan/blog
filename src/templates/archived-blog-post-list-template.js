import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostListArchivedBlog from '../components/PostListArchivedBlog'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'
import Box from '@material-ui/core/Box'
import ArchivedBlogTips from '../components/ArchivedBlogTips'

const PostListTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle, archivedBlogUrl } = useSiteMetadata()
  const { currentPage, prevPagePath, nextPagePath } = pageContext
  const pageTitle = currentPage > 0
    ? `存档文章 - 第 ${currentPage} 页 - ${siteTitle}`
    : siteTitle

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Box mb={3}>
        <ArchivedBlogTips originLink={archivedBlogUrl}/>
      </Box>
      <PostListArchivedBlog edges={data.allArchivedBlogPostJson.edges}/>
      <Pagination
        prevPageName={prevPagePath ? '' : '最近文章'}
        prevPagePath={prevPagePath ? prevPagePath : '/page'}
        nextPagePath={nextPagePath}
      />
    </Layout>
  )
}

export const query = graphql`
  query ArchivedBlogPostListTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allArchivedBlogPostJson(
        limit: $postsLimit,
        skip: $postsOffset,
        sort:  {fields: date, order: DESC}
      ) {
      edges {
        node {
          date
          excerpt
          path
          title
          categories {
            name
            path
          }
        }
      }
    }
  }
`

export default PostListTemplate
