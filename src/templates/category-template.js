import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'
import Typography from '@material-ui/core/Typography'

const CategoryTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()

  const {
    category,
    currentPage,
    prevPagePath,
    nextPagePath,
  } = pageContext

  const { edges } = data.allMarkdownRemark
  const pageTitle = currentPage > 0
    ? `${category} - Page ${currentPage} - ${siteTitle}`
    : `${category} - ${siteTitle}`

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Typography component={'h2'} variant={'h4'} gutterBottom>
        {category}
      </Typography>
      <PostList edges={edges}/>
      <Pagination
        prevPagePath={prevPagePath}
        nextPagePath={nextPagePath}
      />
    </Layout>
  )
}

export const query = graphql`
  query CategoryPage($category: String, $postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { category: { eq: $category }, template: { eq: "post" }, draft: { ne: true } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          fields {
            categorySlug
            slug
          }
          frontmatter {
            date
            description
            category
            title
          }
        }
      }
    }
  }
`

export default CategoryTemplate
