import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import { useSiteMetadata } from '../hooks'
import Comments from '../components/Comments'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()
  const { title: postTitle, description: postDescription } = data.markdownRemark.frontmatter
  const { slug } = data.markdownRemark.fields
  const metaDescription = postDescription !== null
    ? postDescription
    : siteSubtitle

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <Post post={data.markdownRemark}/>
      <Comments postSlug={slug} postTitle={postTitle}/>
    </Layout>
  )
}

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        categorySlug
        tagSlugs
      }
      frontmatter {
        title
        date
        category
        description
        tags
      }
    }
  }
`

export default PostTemplate
