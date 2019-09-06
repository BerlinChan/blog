import React from 'react'
import { graphql } from 'gatsby'
import { useSiteMetadata } from '../hooks'
import Layout from '../components/Layout'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import ButtonBase from '@material-ui/core/ButtonBase'
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
    display: 'block',
    position: 'relative',
    textAlign: 'left',
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
                    <ButtonBase focusRipple className={classes.mainFeaturedPostContent}
                                component={GatsbyLink} to={featuredPostEdge.node.frontmatter.slug}>
                      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {featuredPostEdge.node.frontmatter.title}
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        {featuredPostEdge.node.frontmatter.description}
                      </Typography>
                      <Typography variant="subtitle1" color={'inherit'}>
                        阅读…
                      </Typography>
                    </ButtonBase>
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
                                fixed(width: 200, height: 200, cropFocus: CENTER) {
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
