import React, { useEffect } from 'react'
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

  useEffect(() => {
    const scriptSrcs = data.archivedBlogPostJson.content.match(/\ssrc=".+\.js"/g)
    scriptSrcs.length && scriptSrcs.forEach(item => {
      const scriptSrc = item.match(/\ssrc="(.+\.js)"/)[1]
      const scriptElm = document.createElement('script')
      scriptElm.type = 'text/javaScript'
      scriptElm.src = scriptSrc
      document.getElementsByTagName('head')[0].appendChild(scriptElm)
    })
    /*const scriptContents = data.archivedBlogPostJson.content.match(/<script\stype="text\/javascript">.+?<\/script>/g)
    scriptContents.length && scriptContents.forEach(item => {
      const content = item.match(/<script\stype="text\/javascript">(.+)<\/script>/)[1]
      const scriptElm = document.createElement('script')
      scriptElm.type = 'text/javaScript'
      scriptElm.text = content
      document.getElementsByTagName('head')[0].appendChild(scriptElm)
    })*/
  })

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription}>
      <Typography variant={'body2'}>
        {moment(date).format('YYYY-MM-DD')}
      </Typography>
      <Typography component={'h2'} variant={'h4'}>{postTitle}</Typography>
      <div dangerouslySetInnerHTML={{ __html: data.archivedBlogPostJson.content }}/>
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
