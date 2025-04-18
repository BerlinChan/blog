import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { useSiteMetadata } from "../hooks";
import ArchivedBlogTips from "../components/ArchivedBlogTips";
import Post from "../components/Post";
import Comments from "../components/Comments";
import Content from "../components/Content";
import OpenGraph from "../components/OpenGraph";
import { getSrc } from "gatsby-plugin-image";
import { Box } from "@mui/material";

const PostTemplate = ({ data }) => {
  const { archivedBlogUrl } = useSiteMetadata();
  const {
    title: postTitle,
    excerpt: postDescription,
    content,
    path,
    date,
    tags,
    categories,
  } = data.archivedBlogPostJson;

  return (
    <Layout>
      <Post
        isArchivedBlogPost
        post={{
          frontmatter: {
            slug: path,
            title: postTitle,
            date: date,
            categories: (categories || []).map((category) => category.name),
            description: postDescription,
            tags: (tags || []).map((tag) => tag.name),
          },
          fields: {
            categorySlugs: (categories || []).map((category) => category.path),
            tagSlugs: (tags || []).map((tag) => tag.path),
          },
        }}
      >
        <Content html={content} />
      </Post>
      <Box mt={3}>
        <ArchivedBlogTips originLink={`${archivedBlogUrl}${path}`} />
      </Box>
      <Comments postSlug={path} postTitle={postTitle} />
    </Layout>
  );
};

export default PostTemplate;

export const query = graphql`
  query ArchivedBlogPostByPath($slug: String!) {
    archivedBlogPostJson(path: { eq: $slug }) {
      categories {
        path
        name
      }
      tags {
        name
        path
      }
      featured_media {
        childImageSharp {
          gatsbyImageData(
            width: 800
            height: 400
            placeholder: BLURRED
            layout: FIXED
          )
        }
      }
      path
      date
      excerpt
      title
      content
    }
  }
`;

export const Head = ({ data }) => {
  const {
    siteUrl,
    title: siteTitle,
    subtitle: siteSubtitle,
  } = useSiteMetadata();
  const {
    title: postTitle,
    excerpt: postDescription,
    path,
    featured_media,
  } = data.archivedBlogPostJson;
  const openGraph = {
    title: `${postTitle} | ${siteTitle}`,
    url: `${siteUrl}${path}`,
    description: postDescription !== null ? postDescription : siteSubtitle,
    type: "article",
  };
  if (featured_media) {
    openGraph.image = {
      url: `${siteUrl}${getSrc(
        featured_media.childImageSharp.gatsbyImageData
      )}`,
      width: featured_media.childImageSharp.gatsbyImageData.width,
      height: featured_media.childImageSharp.gatsbyImageData.height,
    };
  }

  return (
    <>
      <title>{`${postTitle} - ${siteTitle}`}</title>
      <OpenGraph {...openGraph} />
    </>
  );
};
