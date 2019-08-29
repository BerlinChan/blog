import React from 'react'
import { graphql } from 'gatsby'
import { useSiteMetadata } from '../hooks'
import Layout from '../components/Layout'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'
import GatsbyLink from 'gatsby-link'
import BackgroundImage from 'gatsby-background-image'

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const { title: siteTitle, postsPerPage } = useSiteMetadata()
  const featuredPostEdge = data.featuredPosts.edges[0]

  return (
    <Layout title={siteTitle}
            featuredContent={<Paper className={classes.mainFeaturedPost}>
              <BackgroundImage fluid={featuredPostEdge.node.frontmatter.featured_media.childImageSharp.fluid}>
                <div className={classes.overlay}/>
                <Grid container>
                  <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {featuredPostEdge.node.frontmatter.title}
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        {featuredPostEdge.node.frontmatter.description}
                      </Typography>
                      <Link component={GatsbyLink} to={featuredPostEdge.node.frontmatter.slug} variant="subtitle1">
                        阅读…
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </BackgroundImage>
            </Paper>}>
      <Typography variant="h6" gutterBottom>近期文章</Typography>
      <Box mb={3}><Divider/></Box>
      <PostList edges={data.recentPosts.edges}/>
      {data.allPostCount.totalCount > postsPerPage && <Pagination nextPagePath={'/page/1'}/>}
    </Layout>
  )
}

export const query = graphql`
    query IndexQuery{
        featuredPosts: allMarkdownRemark(
            filter: {frontmatter: {draft: {ne: true}, template: {eq: "post"}, featured_top: {ne: false}}},
            limit: 1,
            sort: {order: DESC, fields: frontmatter___date}
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        slug
                        description
                        featured_media {
                            childImageSharp {
                                fluid(maxWidth: 1200) {
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG                                }
                            }
                        }
                    }
                }
            }
        }
        recentPosts: allMarkdownRemark(
            limit: 6,
            filter: {frontmatter: {draft: {ne: true}, template: {eq: "post"}}},
            sort: {fields: frontmatter___date, order: DESC}
        ) {
            edges {
                node {
                    fields {
                        slug
                        categorySlug
                    }
                    frontmatter {
                        description
                        slug
                        title
                        category
                        date
                        featured_media {
                            childImageSharp {
                                fixed {
                                    src
                                }
                            }
                        }
                    }
                    excerpt
                }
            }
        }
        allPostCount: allMarkdownRemark(
            filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
        ) { totalCount }
    }
`
