import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Metadata from '../components/Metadata'
import Post from '../components/Post'
import Content from '../components/Content'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'
import Comments from '../components/Comments'
import Box from '@material-ui/core/Box'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, url: siteUrl } = useSiteMetadata()
  const { title: postTitle, description: postDescription, featured_media } = data.markdownRemark.frontmatter
  const { slug } = data.markdownRemark.fields
  const metaData = {
    title: `${postTitle} | ${siteTitle}`,
    url: `${siteUrl}${slug}`,
    description: postDescription !== null ? postDescription : siteSubtitle,
    type: 'article',
    image: {
      url: `${siteUrl}${featured_media.childImageSharp.fixed.src}`,
      width: featured_media.childImageSharp.fixed.width,
      height: featured_media.childImageSharp.fixed.height,
    },
  }

  return (
    <Layout title={`${postTitle} - ${siteTitle}`}>
      <Metadata {...metaData}/>
      <Post post={data.markdownRemark}>
        <Content html={data.markdownRemark.html}/>
      </Post>
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
                categorySlugs
                tagSlugs
            }
            frontmatter {
                title
                date
                categories
                description
                tags
                slug
                featured_media {
                    childImageSharp {
                        fixed(width: 800, height: 400) {
                            height
                            width
                            src
                        }
                    }
                }
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
