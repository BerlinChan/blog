import React from 'react'
import Layout from '../components/Layout'
import { useSiteMetadata } from '../hooks'
import Typography from '@material-ui/core/Typography'

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata()

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Typography variant={'subtitle1'} gutterBottom>
        NOT FOUND
      </Typography>
      <Typography component={'h2'} variant={'h4'}>
        页面不存在
      </Typography>
    </Layout>
  )
}

export default NotFoundTemplate
