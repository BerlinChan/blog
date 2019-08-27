import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useSiteMetadata } from '../hooks'
import ArchivedBlogTips from '../components/ArchivedBlogTips'
import Box from '@material-ui/core/Box'
import Post from '../components/Post'
import Comments from '../components/Comments'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, archivedBlogUrl } = useSiteMetadata()
  const { title: postTitle, excerpt: postDescription, content, path, date, tags } = data.archivedBlogPostJson
  const metaDescription = postDescription ? postDescription : siteSubtitle

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <Post isArchivedBlogPost post={{
        frontmatter: {
          title: postTitle,
          date: date,
          category: '',
          description: postDescription,
          tags: (tags || []).map(tag => tag.name),
        },
        fields: {
          slug: path,
          categorySlug: '',
          tagSlugs: (tags || []).map(tag => tag.path),
        },
        html: content,
      }}/>
      <Box mt={3}>
        <ArchivedBlogTips originLink={`${archivedBlogUrl}${path}`}/>
      </Box>
      <Comments postSlug={path} postTitle={postTitle}/>
    </Layout>
  )
}

export const query = graphql`
  query ArchivedBlogPostByPath($slug: String!) {
    archivedBlogPostJson(path: {eq: $slug}) {
      categories {
        path
        name
      }
      tags {
        name
        path
      }
      featured_media {
        source_url
      }
      path
      date
      excerpt
      title
      content
    }
  }
`

export default PostTemplate
