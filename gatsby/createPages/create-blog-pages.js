const path = require("path");

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { draft: { ne: true }, template: { eq: "page" } }
        }
      ) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/page-template.js"),
      context: { slug: node.fields.slug },
    });
  });
};
