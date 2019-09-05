import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'

const PostListTemplate = ({ data, pageContext }) => {
  const { title: siteTitle} = useSiteMetadata()
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
    <Layout title={pageTitle}>
      <PostList edges={edges}/>
      <Pagination
        nextPageName={nextPagePath ? '' : '存档文章'}
        prevPagePath={prevPagePath}
        nextPagePath={nextPagePath ? nextPagePath : '/archivedBlogPage'}
      />
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
                        featured_media {
                            childImageSharp {
                                fixed(width: 200, height: 200, cropFocus: CENTER) {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export default PostListTemplate
