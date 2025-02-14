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
        group(field: { frontmatter: { categories: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  _.each(allMarkdownRemark.group, (category) => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const categorySlug = `/category/${_.kebabCase(category.fieldValue)}`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? categorySlug : `${categorySlug}/page/${i}`,
        component: path.resolve("./src/templates/category-template.js"),
        context: {
          category: category.fieldValue,
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath:
            i === 0
              ? ""
              : i === 1
              ? categorySlug
              : `${categorySlug}/page/${i - 1}`,
          nextPagePath: i < numPages - 1 ? `${categorySlug}/page/${i + 1}` : "",
        },
      });
    }
  });
};
