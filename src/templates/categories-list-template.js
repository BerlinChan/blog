import React from 'react'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import Layout from '../components/Layout'
import { useSiteMetadata, useCategoriesList } from '../hooks'
import Typography from '@material-ui/core/Typography'

const CategoriesListTemplate = () => {
  const { title, subtitle } = useSiteMetadata()
  const categories = useCategoriesList()

  return (
    <Layout title={`Categories - ${title}`} description={subtitle}>
      <Typography component={'h2'} variant={'h4'} gutterBottom>
        Categories
      </Typography>
      <ul>
        {categories.map((category) => (
          <li key={category.fieldValue}>
            <Link to={`/category/${kebabCase(category.fieldValue)}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default CategoriesListTemplate
