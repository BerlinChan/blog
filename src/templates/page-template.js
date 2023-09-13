import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { useSiteMetadata } from "../hooks";
import Typography from "@mui/material/Typography";
import Content from "../components/Content";
import OpenGraph from "../components/OpenGraph";

const PageTemplate = ({ data }) => {
  const { html: pageBody } = data.markdownRemark;
  const { title: pageTitle } = data.markdownRemark.frontmatter;

  return (
    <Layout noSidebar>
      <Typography component={"h2"} variant={"h4"} gutterBottom>
        {pageTitle}
      </Typography>
      <Content html={pageBody} />
    </Layout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
        slug
      }
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
    title: pageTitle,
    description: pageDescription,
    slug,
  } = data.markdownRemark.frontmatter;
  const openGraph = {
    title: `${pageTitle} | ${siteTitle}`,
    url: `${siteUrl}${slug}`,
    description: pageDescription !== null ? pageDescription : siteSubtitle,
    type: "article",
  };

  return (
    <>
      <title>{`${pageTitle} - ${siteTitle}`}</title>
      <OpenGraph {...openGraph} />
    </>
  );
};
