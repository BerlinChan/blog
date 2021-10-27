const _ = require("lodash");
const { createFilePath } = require("gatsby-source-filesystem");

const onCreateNode = async ({
  node,
  actions: { createNodeField },
  getNode,
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
  }
};

module.exports = onCreateNode;
