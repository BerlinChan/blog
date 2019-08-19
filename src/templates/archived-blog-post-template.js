import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
// import Post from '../components/Post'
import { useSiteMetadata } from '../hooks'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()
  const { title: postTitle, excerpt: postDescription } = data.allWordpressPostJson
  const metaDescription = postDescription !== null
    ? postDescription
    : siteSubtitle

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <div dangerouslySetInnerHTML={{ __html: data.allWordpressPostJson.content }}/>
    </Layout>
  )
}

export const query = graphql`
  query PostByPath($slug: String!) {
    allWordpressPostJson(path: {eq: $slug}) {
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
