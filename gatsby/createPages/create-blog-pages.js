const path = require('path')

module.exports = async (graphql, actions) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true }, template: { eq: "page"} } }
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve('./src/templates/page-template.js'),
      context: { slug: edge.node.fields.slug },
    })
  })
}
