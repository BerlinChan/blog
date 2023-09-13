exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(
    `
        type ArchivedBlogPostJson implements Node {
            featuredImg: String
            featured_media: File @link(from: "fields.featured_media_id")
        }
    `
  );
};
exports.createPages = require("./gatsby/create-pages");
exports.onCreateNode = require("./gatsby/on-create-node");
