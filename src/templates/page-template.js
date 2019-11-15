import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useSiteMetadata } from '../hooks'
import Typography from '@material-ui/core/Typography'
import Content from '../components/Content'
import OpenGraph from '../components/OpenGraph'

const PageTemplate = ({ data }) => {
  const { url: siteUrl, title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()
  const { html: pageBody } = data.markdownRemark
  const { title: pageTitle, description: pageDescription, slug } = data.markdownRemark.frontmatter
  const openGraph = {
    title: `${pageTitle} | ${siteTitle}`,
    url: `${siteUrl}${slug}`,
    description: pageDescription !== null ? pageDescription : siteSubtitle,
    type: 'article',
  }

  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} noSidebar>
      <OpenGraph {...openGraph}/>
      <Typography component={'h2'} variant={'h4'} gutterBottom>
        {pageTitle}
      </Typography>
      <Content html={pageBody}/>
    </Layout>
  )
}

export const query = graphql`
    query PageBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                date
                description
                slug
            }
        }
    }
`

export default PageTemplate
