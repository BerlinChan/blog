const path = require("path");

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allArchivedBlogPostJson {
        nodes {
          path
        }
      }
    }
  `);

  result.data.allArchivedBlogPostJson.nodes.forEach((node) =>
    createPage({
      path: node.path,
      component: path.resolve("./src/templates/post-archived-blog-template.js"),
      context: { slug: node.path },
    })
  );
};
