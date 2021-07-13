const path = require("path");

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { draft: { ne: true }, template: { eq: "post" } }
        }
        sort: { fields: frontmatter___date, order: ASC }
      ) {
        nodes {
          frontmatter {
            template
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.nodes.forEach((node, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/post-template.js"),
      context: {
        slug: node.fields.slug,
        prevPostSlug: index > 0 ? nodes[index - 1].fields.slug : "",
        nextPostSlug:
          index < nodes.length - 1 ? nodes[index + 1].fields.slug : "",
      },
    });
  });
};
