import React from "react";
import { graphql } from "gatsby";
import { useSiteMetadata } from "../hooks";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import { Link as GatsbyLink } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    display: "block",
    position: "relative",
    textAlign: "left",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const HomePage = ({ data }) => {
  const classes = useStyles();
  const { title: siteTitle, postsPerPage } = useSiteMetadata();
  const featuredPostNode = data.featuredPosts.nodes[0];

  return (
    <Layout
      title={siteTitle}
      featuredContent={
        <Paper className={classes.mainFeaturedPost}>
          <GatsbyImage
            className={classes.background}
            image={getImage(
              featuredPostNode.frontmatter.featured_media.childImageSharp
            )}
            alt={featuredPostNode.frontmatter.title}
            layout="fullWidth"
          />
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <ButtonBase
                focusRipple
                className={classes.mainFeaturedPostContent}
                component={GatsbyLink}
                to={featuredPostNode.frontmatter.slug}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {featuredPostNode.frontmatter.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {featuredPostNode.frontmatter.description}
                </Typography>
                <Typography variant="subtitle1" color={"inherit"}>
                  阅读…
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Paper>
      }
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
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          slug
          description
          featured_media {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(
      limit: 6
      filter: { frontmatter: { draft: { ne: true }, template: { eq: "post" } } }
      sort: { fields: frontmatter___date, order: DESC }
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
