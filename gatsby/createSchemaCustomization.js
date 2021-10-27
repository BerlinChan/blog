const createSchemaCustomization=({ actions }) => {
  const { createTypes } = actions;
  createTypes({
    `
      type CustomImage implements Node {
        localImage: File!
      }
    `
  })
}

exports.default = createSchemaCustomization