import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Link from '@material-ui/core/Link'
import kebabCase from 'lodash/kebabCase'
import Layout from '../components/Layout'
import { useCategoriesList, useSiteMetadata } from '../hooks'
import Typography from '@material-ui/core/Typography'

const CategoriesListTemplate = () => {
  const { title, subtitle } = useSiteMetadata()
  const categories = useCategoriesList()

  return (
    <Layout title={`文章分类 - ${title}`} description={subtitle}>
      <Typography component={'h2'} variant={'h4'} gutterBottom>
        文章分类
      </Typography>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link component={GatsbyLink} to={`/category/${kebabCase(category.fieldValue)}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default CategoriesListTemplate
