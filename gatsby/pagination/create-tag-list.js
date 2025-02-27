const _ = require("lodash");
const path = require("path");

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const {
    data: {
      allMarkdownRemark,
      site: {
        siteMetadata: { postsPerPage },
      },
    },
  } = await graphql(`
    {
      site {
        siteMetadata {
          postsPerPage
        }
      }
      allMarkdownRemark(
        filter: {
          frontmatter: { template: { eq: "post" }, draft: { ne: true } }
        }
      ) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  _.each(allMarkdownRemark.group, (tag) => {
    const numPages = Math.ceil(tag.totalCount / postsPerPage);
    const tagSlug = `/tag/${_.kebabCase(tag.fieldValue)}`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? tagSlug : `${tagSlug}/page/${i}`,
        component: path.resolve("./src/templates/tag-template.js"),
        context: {
          tag: tag.fieldValue,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath:
            i === 0 ? "" : i === 1 ? tagSlug : `${tagSlug}/page/${i - 1}`,
          nextPagePath: i < numPages - 1 ? `${tagSlug}/page/${i + 1}` : "",
        },
      });
    }
  });
};
