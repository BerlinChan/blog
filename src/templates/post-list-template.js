import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import { useSiteMetadata } from "../hooks";

const PostListTemplate = ({ data, pageContext }) => {
  const { title: siteTitle } = useSiteMetadata();
  const { currentPage, prevPagePath, nextPagePath } = pageContext;
  const pageTitle =
    currentPage > 0 ? `文章 - 第 ${currentPage} 页 - ${siteTitle}` : siteTitle;

  return (
    <Layout title={pageTitle}>
      <PostList nodes={data.allMarkdownRemark.nodes} />
      <Pagination
        nextPageName={nextPagePath ? "" : "存档文章"}
        prevPagePath={prevPagePath}
        nextPagePath={nextPagePath ? nextPagePath : "/archivedBlogPage"}
      />
    </Layout>
  );
};

export const query = graphql`
  query PostListTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
        fields {
          slug
          categorySlugs
        }
        frontmatter {
          title
          date
          categories
          description
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
        excerpt(pruneLength: 70)
      }
    }
  }
`;

export default PostListTemplate;
