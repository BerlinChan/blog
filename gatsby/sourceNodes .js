const sourceNodes = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  store,
  cache,
  reporter,
}) => {
  const { createNode } = actions;
  if (node.internal.type === "ArchivedBlogPostJson" && node.featuredImg) {
    let image = await createRemoteFileNode({
      url: node.featuredImg, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
      reporter,
    });
    // if the file was created, attach the new node to the parent node
    if (image) {
      node.featured_media___NODE = image.id;
    }
  }
  // ==========================================================================================================================

  // code to fetch data
  for (const { url } of remoteImages) {
    const nodeId = createNodeId(`my-data-${url}`);
    const image = await createRemoteFileNode({
      url: url,
      parentNodeId: nodeId,
      store,
      cache,
      createNode,
      createNodeId,
      reporter,
    });
    const node = {
      id: nodeId,
      parent: null,
      children: [],
      url,
      localImageId: image.id,
      internal: {
        type: `CustomImage`,
        content: url,
        contentDigest: createContentDigest(url),
      },
    };
    createNode(node);
  }
};

exports.default = sourceNodes;
