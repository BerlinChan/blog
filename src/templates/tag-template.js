import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import { useSiteMetadata } from "../hooks";
import Typography from "@material-ui/core/Typography";

const TagTemplate = ({ data, pageContext }) => {
  const { title: siteTitle } = useSiteMetadata();
  const { tag, currentPage, prevPagePath, nextPagePath } = pageContext;
  const pageTitle =
    currentPage > 0
      ? `包含标签"${tag}"的文章 - 第 ${currentPage} 页 - ${siteTitle}`
      : `包含标签"${tag}"的文章 - ${siteTitle}`;

  return (
    <Layout title={pageTitle}>
      <Typography component={"h2"} variant={"h4"} gutterBottom>
        {tag}
      </Typography>
      <PostList nodes={data.allMarkdownRemark.nodes} />
      <Pagination prevPagePath={prevPagePath} nextPagePath={nextPagePath} />
    </Layout>
  );
};

export const query = graphql`
  query TagPage($tag: String, $postsLimit: Int!, $postsOffset: Int!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          template: { eq: "post" }
          draft: { ne: true }
        }
      }
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
              gatsbyImageData(placeholder: BLURRED, layout: FIXED)
            }
          }
        }
      }
    }
  }
`;

export default TagTemplate;
