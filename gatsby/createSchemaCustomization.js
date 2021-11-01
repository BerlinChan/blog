const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(
    `
      type ArchivedBlogPostJson implements Node {
        featured_media: File @link(from: "fields.featured_media_id")
      }
    `
  );
};

exports.default = createSchemaCustomization;
