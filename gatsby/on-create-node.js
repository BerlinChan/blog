const _ = require("lodash");
const {
  createFilePath,
  createRemoteFileNode,
} = require("gatsby-source-filesystem");

const onCreateNode = async ({
  node,
  actions: { createNodeField, createNode },
  getNode,
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === "MarkdownRemark") {
    if (typeof node.frontmatter.slug !== "undefined") {
      createNodeField({
        node,
        name: "slug",
        value: node.frontmatter.slug,
      });
    } else {
      const value = createFilePath({ node, getNode });
      createNodeField({
        node,
        name: "slug",
        value,
      });
    }

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        (tag) => `/tag/${_.kebabCase(tag)}/`
      );
      createNodeField({ node, name: "tagSlugs", value: tagSlugs });
    }

    if (node.frontmatter.categories) {
      const categorySlugs = node.frontmatter.categories.map(
        (category) => `/category/${_.kebabCase(category)}/`
      );
      createNodeField({ node, name: "categorySlugs", value: categorySlugs });
    }
  } else if (
    node.internal.type === "ArchivedBlogPostJson" &&
    node.featuredImg
  ) {
    const fileNode = await createRemoteFileNode({
      url: node.featuredImg, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featured_media___NODE = fileNode.id;
    }
  }
};

module.exports = onCreateNode;
