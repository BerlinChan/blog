import React from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import OpenGraph from '../components/OpenGraph'
import Post from '../components/Post'
import Content from '../components/Content'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'
import Comments from '../components/Comments'
import Box from '@material-ui/core/Box'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, siteUrl } = useSiteMetadata()
  const { title: postTitle, description: postDescription, featured_media } = data.markdownRemark.frontmatter
  const { slug } = data.markdownRemark.fields
  const openGraph = {
    title: `${postTitle} | ${siteTitle}`,
    url: `${siteUrl}${slug}`,
    description: postDescription !== null ? postDescription : siteSubtitle,
    type: 'article',
  }
  if (featured_media) {
    openGraph.image = {
      url: `${siteUrl}${featured_media.childImageSharp.fixed.src}`,
      width: featured_media.childImageSharp.fixed.width,
      height: featured_media.childImageSharp.fixed.height,
    }
  }

  return (
    <Layout title={`${postTitle} - ${siteTitle}`}>
      <OpenGraph {...openGraph}/>
      <Post post={data.markdownRemark}>
        <Content html={data.markdownRemark.html}/>
      </Post>
      <Box my={2}>
        <Pagination prevPageName={get(data, 'prevPost.frontmatter.title')}
                    nextPageName={get(data, 'nextPost.frontmatter.title')}
                    prevPagePath={get(data, 'prevPost.fields.slug')}
                    nextPagePath={get(data, 'nextPost.fields.slug')}
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
