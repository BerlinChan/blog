import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { useSiteMetadata } from "../hooks";
import Box from "@material-ui/core/Box";
import ArchivedBlogTips from "../components/ArchivedBlogTips";
import PostList from "../components/PostList";

const PostListTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, archivedBlogUrl } = useSiteMetadata();
  const { currentPage, prevPagePath, nextPagePath } = pageContext;
  const pageTitle =
    currentPage > 0
      ? `存档文章 - 第 ${currentPage} 页 - ${siteTitle}`
      : siteTitle;

  return (
    <Layout title={pageTitle}>
      <Box mb={3}>
        <ArchivedBlogTips originLink={archivedBlogUrl} />
      </Box>
      <PostList
        nodes={data.allArchivedBlogPostJson.nodes.map((node) => ({
          fields: {
            slug: node.path,
            categorySlugs: (node.categories || []).map(
              (category) => category.path
            ),
          },
          frontmatter: {
            title: node.title,
            date: node.date,
            categories: (node.categories || []).map(
              (category) => category.name
            ),
            description: node.excerpt,
            featured_media: node.featured_media,
          },
        }))}
      />
      <Pagination
        prevPageName={prevPagePath ? "" : "最近文章"}
        prevPagePath={prevPagePath ? prevPagePath : "/page"}
        nextPagePath={nextPagePath}
      />
    </Layout>
  );
};

export const query = graphql`
  query PostListArchivedBlogTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allArchivedBlogPostJson(
      limit: $postsLimit
      skip: $postsOffset
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        date
        excerpt
        path
        title
        categories {
          name
          path
        }
        featured_media {
          childImageSharp {
            gatsbyImageData(
              width: 200
              height: 200
              placeholder: BLURRED
              transformOptions: { cropFocus: CENTER }
              layout: FIXED
            )
          }
        }
      }
    }
  }
`;

export default PostListTemplate;
