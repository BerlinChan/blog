const path = require('path')
const createCategoriesPages = require('./pagination/create-category-list.js')
const createTagsPages = require('./pagination/create-tag-list.js')
const createPostsPages = require('./pagination/create-post-list.js')
const createPosts = require('./createPages/create-posts.js')
const createBlogPages = require('./createPages/create-blog-pages')
const createArchivedBlogPosts = require('./createPages/create-archived-blog-posts')

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

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js'),
  })

  // Feeds
  await createPosts(graphql, actions)
  await createBlogPages(graphql, actions)
  await createArchivedBlogPosts(graphql, actions)
  await createTagsPages(graphql, actions)
  await createCategoriesPages(graphql, actions)
  await createPostsPages(graphql, actions)
}

module.exports = createPages
