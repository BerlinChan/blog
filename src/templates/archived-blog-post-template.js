import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import Layout from '../components/Layout'
import { useSiteMetadata } from '../hooks'
import ArchivedBlogTips from '../components/ArchivedBlogTips'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, archivedBlogUrl } = useSiteMetadata()
  const { title: postTitle, excerpt: postDescription, path, date } = data.archivedBlogPostJson
  const metaDescription = postDescription ? postDescription : siteSubtitle

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <Typography variant={'body2'}>
        {moment(date).utcOffset(8).format('YYYY-MM-DD')}
      </Typography>
      <Typography component={'h2'} variant={'h4'}>{postTitle}</Typography>
      <div
        dangerouslySetInnerHTML={{ __html: data.archivedBlogPostJson.content }}/>
      <Box mt={3}>
        <ArchivedBlogTips originLink={`${archivedBlogUrl}${path}`}/>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query PostByPath($slug: String!) {
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
