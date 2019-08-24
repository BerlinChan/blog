import React from 'react'
import Layout from '../components/Layout'
import { useSiteMetadata } from '../hooks'
import Typography from '@material-ui/core/Typography'

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata()

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Typography component={'h2'} variant={'h4'} gutterBottom>
        NOT FOUND
      </Typography>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundTemplate
