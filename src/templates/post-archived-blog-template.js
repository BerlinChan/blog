import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { useSiteMetadata } from "../hooks";
import ArchivedBlogTips from "../components/ArchivedBlogTips";
import Box from "@material-ui/core/Box";
import Post from "../components/Post";
import Comments from "../components/Comments";
import Content from "../components/Content";
import OpenGraph from "../components/OpenGraph";
import { getSrc } from "gatsby-plugin-image"

const PostTemplate = ({ data }) => {
  const {
    siteUrl,
    title: siteTitle,
    subtitle: siteSubtitle,
    archivedBlogUrl,
  } = useSiteMetadata();
  const {
    title: postTitle,
    excerpt: postDescription,
    content,
    path,
    date,
    tags,
    categories,
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
      url: `${siteUrl}${getSrc(featured_media.childImageSharp.gatsbyImageData)}`,
      width: featured_media.childImageSharp.gatsbyImageData.width,
      height: featured_media.childImageSharp.gatsbyImageData.height,
    }
  }

  return (
    <Layout title={`${postTitle} - ${siteTitle}`}>
      <OpenGraph {...openGraph} />
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

export default PostTemplate;
