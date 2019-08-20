import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import { useSiteMetadata } from '../hooks'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()
  const { title: postTitle, excerpt: postDescription } = data.wordpressPostJson
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <div dangerouslySetInnerHTML={{ __html: data.wordpressPostJson.content }}/>
    </Layout>
  )
}

export const query = graphql`
  query PostByPath($slug: String!) {
    wordpressPostJson(path: {eq: $slug}) {
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
