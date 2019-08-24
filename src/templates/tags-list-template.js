import React from 'react'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Layout from '../components/Layout'
import { useSiteMetadata, useTagsList } from '../hooks'
import Typography from '@material-ui/core/Typography'

const TagsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata()
  const tags = useTagsList()

  return (
    <Layout title={`Tags - ${title}`} description={subtitle}>
      <Typography component={'h2'} variant={'h4'} gutterBottom>
        Tags
      </Typography>
      <ul>
        {tags.map((tag) => (
          <li key={tag.fieldValue}>
            <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default TagsListTemplate
