const path = require('path')

module.exports = async (graphql, actions) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allArchivedBlogPostJson {
        edges {
          node {
            path
          }
        }
      }
    }
  `)

  result.data.allArchivedBlogPostJson.edges.forEach(edge =>
    createPage({
      path: edge.node.path,
      component: path.resolve('./src/templates/post-archived-blog-template.js'),
      context: { slug: edge.node.path },
    })
  )
}
