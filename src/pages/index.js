import React from "react";
import { graphql } from "gatsby";
import { useSiteMetadata } from "../hooks";
import Layout from "../components/Layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import FeaturedPost from "../components/FeaturedPost";

const HomePage = ({ data }) => {
  const { postsPerPage } = useSiteMetadata();
  const featuredPostNode = data.featuredPosts.nodes[0];

  return (
    <Layout
      featuredContent={<FeaturedPost featuredPostNode={featuredPostNode} />}
    >
      <Typography variant="h6" gutterBottom>
        近期文章
      </Typography>
      <Box mb={3}>
        <Divider />
      </Box>
      <PostList nodes={data.recentPosts.nodes} />
      {data.allPostCount.totalCount > postsPerPage && (
        <Pagination nextPagePath={"/page/1"} />
      )}
    </Layout>
  );
};

export default HomePage;

export const query = graphql`
  query IndexQuery {
    featuredPosts: allMarkdownRemark(
      filter: {
        frontmatter: {
          draft: { ne: true }
          template: { eq: "post" }
          featured_top: { ne: false }
        }
      }
      limit: 1
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          description
          featured_media {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 3
                placeholder: BLURRED
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { draft: { ne: true }, template: { eq: "post" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
          categorySlugs
        }
        frontmatter {
          description
          slug
          title
          categories
          date
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
    allPostCount: allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      totalCount
    }
  }
`;

export const Head = () => {
  const { title: siteTitle } = useSiteMetadata();

  return <title>{siteTitle}</title>;
};
