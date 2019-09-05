import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useSiteMetadata } from '../hooks'
import Typography from '@material-ui/core/Typography'
import Content from '../components/Content'

const PageTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata()
  const { html: pageBody } = data.markdownRemark
  const { title: pageTitle, description: pageDescription } = data.markdownRemark.frontmatter
  const metaDescription = pageDescription !== null
    ? pageDescription
    : siteSubtitle

  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} noSidebar>
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
            }
        }
    }
`

export default PageTemplate
