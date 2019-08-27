const path = require('path')
const _ = require('lodash')
const createCategoriesPages = require('./pagination/create-category-list.js')
const createTagsPages = require('./pagination/create-tag-list.js')
const createPostsPages = require('./pagination/create-post-list.js')

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js'),
  })

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js'),
  })

  // Tags list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js'),
  })

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
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

  _.each(edges, (edge) => {
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug: edge.node.fields.slug },
      })
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/post-template.js'),
        context: { slug: edge.node.fields.slug },
      })
    }
  })

  // archived blog from Wordpress
  const archivedBlogPosts = await graphql(`
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
  archivedBlogPosts.data.allArchivedBlogPostJson.edges.forEach(edge =>
    createPage({
      path: edge.node.path,
      component: path.resolve('./src/templates/post-archived-blog-template.js'),
      context: { slug: edge.node.path },
    }))

  // Feeds
  await createTagsPages(graphql, actions)
  await createCategoriesPages(graphql, actions)
  await createPostsPages(graphql, actions)
}

module.exports = createPages
