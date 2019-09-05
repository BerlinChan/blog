import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Layout from '../components/Layout'
import { useSiteMetadata, useTagsList } from '../hooks'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const TagsListTemplate = () => {
  const { title } = useSiteMetadata()
  const tags = useTagsList()

  return (
    <Layout title={`标签 - ${title}`}>
      <Typography component={'h2'} variant={'h4'} gutterBottom>
        标签
      </Typography>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link component={GatsbyLink} to={`/tag/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default TagsListTemplate
