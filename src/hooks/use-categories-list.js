import { graphql, useStaticQuery } from 'gatsby'

const useCategoriesList = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
        query CategoriesListQuery {
            allMarkdownRemark(
                filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
            ) {
                group(field: frontmatter___categories, limit: 10) {
                    fieldValue
                    totalCount
                }
            }
        }
    `,
  )

  return allMarkdownRemark.group
}

export default useCategoriesList
