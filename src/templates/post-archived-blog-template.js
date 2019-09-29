import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useSiteMetadata } from '../hooks'
import ArchivedBlogTips from '../components/ArchivedBlogTips'
import Box from '@material-ui/core/Box'
import Post from '../components/Post'
import Comments from '../components/Comments'
import Content from '../components/Content'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, archivedBlogUrl } = useSiteMetadata()
  const { title: postTitle, excerpt: postDescription, content, path, date, tags, categories } = data.archivedBlogPostJson

  return (
    <Layout title={`${postTitle} - ${siteTitle}`}>
      <Post isArchivedBlogPost post={{
        frontmatter: {
          title: postTitle,
          date: date,
          categories: (categories || []).map(category => category.name),
          description: postDescription,
          tags: (tags || []).map(tag => tag.name),
        },
        fields: {
          slug: path,
          categorySlugs: (categories || []).map(category => category.path),
          tagSlugs: (tags || []).map(tag => tag.path),
        },
      }}>
        <Content html={content}/>
      </Post>
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
