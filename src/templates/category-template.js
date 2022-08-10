import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import { useSiteMetadata } from "../hooks";
import Typography from "@mui/material/Typography";

const CategoryTemplate = ({ data, pageContext }) => {
  const { category, prevPagePath, nextPagePath } = pageContext;

  return (
    <Layout>
      <Typography component={"h2"} variant={"h4"} gutterBottom>
        {category}
      </Typography>
      <PostList nodes={data.allMarkdownRemark.nodes} />
      <Pagination prevPagePath={prevPagePath} nextPagePath={nextPagePath} />
    </Layout>
  );
};

export const query = graphql`
  query CategoryPage($category: String, $postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: {
        frontmatter: {
          categories: { in: [$category] }
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
        excerpt(pruneLength: 70)
      }
    }
  }
`;

export default CategoryTemplate;

export const Head = ({ pageContext }) => {
  const { title: siteTitle } = useSiteMetadata();
  const { category, currentPage } = pageContext;
  const pageTitle =
    currentPage > 0
      ? `${category} - Page ${currentPage} - ${siteTitle}`
      : `${category} - ${siteTitle}`;

  return <title>{pageTitle}</title>;
};
