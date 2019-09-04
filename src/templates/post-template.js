import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'
import Comments from '../components/Comments'
import Box from '@material-ui/core/Box'

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
      <Box my={2}>
        <Pagination prevPageName={data.prevPost && data.prevPost.frontmatter.title}
                    nextPageName={data.nextPost && data.nextPost.frontmatter.title}
                    prevPagePath={data.prevPost && data.prevPost.fields.slug}
                    nextPagePath={data.nextPost && data.nextPost.fields.slug}
        />
      </Box>
      <Comments postSlug={slug} postTitle={postTitle}/>
    </Layout>
  )
}

export const query = graphql`
    query PostBySlug($slug: String!, $prevPostSlug: String, $nextPostSlug: String) {
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
        prevPost: markdownRemark(fields: {slug: {eq: $prevPostSlug} }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        nextPost: markdownRemark(fields: {slug: {eq: $nextPostSlug} }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`

export default PostTemplate
