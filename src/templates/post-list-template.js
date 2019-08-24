import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Feed from '../components/Feed'
import Page from '../components/Page'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'

const PostListTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()
  const {
    currentPage,
    prevPagePath,
    nextPagePath,
  } = pageContext
  const { edges } = data.allMarkdownRemark
  const pageTitle = currentPage > 0
    ? `文章 - 第 ${currentPage} 页 - ${siteTitle}`
    : siteTitle

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Page>
        <Feed edges={edges}/>
        <Pagination
          nextPageName={nextPagePath ? '' : '存档文章'}
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath ? nextPagePath : '/archivedBlogPage'}
        />
      </Page>
    </Layout>
  )
}

export const query = graphql`
  query PostListTemplate($postsLimit: Int!, $postsOffset: Int!) {
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

export default PostListTemplate
