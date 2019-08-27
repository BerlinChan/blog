const path = require('path')
const siteConfig = require('../../config.js')

module.exports = async (graphql, actions) => {
  const { createPage } = actions
  const result = await graphql(`
   query {
      allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      ) { totalCount }
      allArchivedBlogPostJson {
        totalCount
      }
     }
  `)

  const { postsPerPage } = siteConfig
  const numPages = Math.ceil(result.data.allMarkdownRemark.totalCount / postsPerPage)
  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? `/page` : `/page/${i}`,
      component: path.resolve('./src/templates/post-list-template.js'),
      context: {
        currentPage: i,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: i === 0 ? '' : i === 1 ? '/page' : `/page/${i - 1}`,
        nextPagePath: i < numPages - 1 ? `/page/${i + 1}` : '',
      },
    })
  }

  const numPagesArchivedBlog = Math.ceil(result.data.allArchivedBlogPostJson.totalCount / postsPerPage)
  for (let i = 0; i < numPagesArchivedBlog; i += 1) {
    createPage({
      path: i === 0 ? `/archivedBlogPage` : `/archivedBlogPage/${i}`,
      component: path.resolve('./src/templates/archived-blog-post-list-template.js'),
      context: {
        currentPage: i,
        postsLimit: postsPerPage,
        postsOffset: i * postsPerPage,
        prevPagePath: i === 0 ? '' : i === 1 ? '/archivedBlogPage' : `/archivedBlogPage/${i - 1}`,
        nextPagePath: i < numPagesArchivedBlog - 1 ? `/archivedBlogPage/${i + 1}` : '',
      },
    })
  }
}
