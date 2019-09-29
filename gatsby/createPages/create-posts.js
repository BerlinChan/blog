const path = require('path')

module.exports = async (graphql, actions) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true }, template: { eq: "post"} } },
        sort: {fields: frontmatter___date, order: ASC}
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

  const { edges } = result.data.allMarkdownRemark
  edges.forEach((edge, index) => {
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve('./src/templates/post-template.js'),
      context: {
        slug: edge.node.fields.slug,
        prevPostSlug: index > 0 ? edges[index - 1].node.fields.slug : '',
        nextPostSlug: index < edges.length - 1 ? edges[index + 1].node.fields.slug : '',
      },
    })
  })
}
