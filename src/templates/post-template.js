import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Pagination from '../components/Pagination'
import { useSiteMetadata } from '../hooks'
import Comments from '../components/Comments'
import Box from '@material-ui/core/Box'
import Helmet from 'react-helmet'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, url: siteUrl, author: { name: siteAuthorName } } = useSiteMetadata()
  const { title: postTitle, description: postDescription, featured_media } = data.markdownRemark.frontmatter
  const { slug } = data.markdownRemark.fields
  const metaDescription = postDescription !== null
    ? postDescription
    : siteSubtitle

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <Helmet>
        {/* Open Graph for Facebook & Twitter */}
        <meta property="og:url" content={`${siteUrl}${slug}`}/>
        <meta property="og:site_name" content={siteTitle}/>
        <meta property="og:type" content="article"/>
        <meta property="article:author" content={siteAuthorName}/>
        <meta property="og:title" content={postTitle}/>
        <meta property="og:description" content={metaDescription}/>
        {featured_media &&
        <meta property="og:image" content={`${siteUrl}${featured_media.childImageSharp.fixed.src}`}/>}
        {featured_media &&
        <meta property="og:image:secure_url" content={`${siteUrl}${featured_media.childImageSharp.fixed.src}`}/>}
        {featured_media && <meta property="og:image:width" content={featured_media.childImageSharp.fixed.width}/>}
        {featured_media && <meta property="og:image:height" content={featured_media.childImageSharp.fixed.height}/>}

        {/*twitter card*/}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@BerlinChanCom"/>
        <meta name="twitter:creator" content="@BerlinChanCom"/>
      </Helmet>

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
