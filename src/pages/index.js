import React from 'react'
import { Link as GatsbyLink, graphql } from 'gatsby'
import { useSiteMetadata } from '../hooks'
import Layout from '../components/Layout'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
  cardActionArea: {
    marginBottom: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  featuredBottom: {
    marginBottom: theme.spacing(3),
  },
}))

export default ({ data }) => {
  const classes = useStyles()
  const { title: siteTitle } = useSiteMetadata()

  return (
    <Layout title={siteTitle}
            featuredContent={<React.Fragment>
              {false && <Paper className={classes.mainFeaturedPost}>
                {/* Increase the priority of the hero background image */}
                {
                  <img
                    style={{ display: 'none' }}
                    src="https://source.unsplash.com/user/erondu"
                    alt="background"
                  />
                }
                <div className={classes.overlay}/>
                <Grid container>
                  <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        Title of a longer featured blog post
                      </Typography>
                      <Typography variant="h5" color="inherit" paragraph>
                        Multiple lines of text that form the lede, informing new readers quickly and
                        efficiently about what&apos;s most interesting in this post&apos;s contents.
                      </Typography>
                      <Link variant="subtitle1" href="#">
                        Continue reading…
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </Paper>}
            </React.Fragment>}>
      <Typography variant="h6" gutterBottom>近期文章</Typography>
      <Box mb={3}><Divider/></Box>
      {data.recentPosts.edges.map(({ node }, index) => (
        <CardActionArea component={GatsbyLink} to={node.frontmatter.slug} key={index}
                        className={classes.cardActionArea}>
          <Card className={classes.card}>
            <Box className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {node.frontmatter.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {moment(node.frontmatter.date).format('YYYY-MM-DD')}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {node.frontmatter.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  阅读
                </Typography>
              </CardContent>
            </Box>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title={node.frontmatter.title}
              />
            </Hidden>
          </Card>
        </CardActionArea>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery{
    featuredPosts: allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}, template: {eq: "post"}, featured_top: {ne: false}}}, limit: 3, sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          frontmatter {
            date
            title
            slug
            description
          }
        }
      }
    }
    recentPosts: allMarkdownRemark(limit: 6, filter: {frontmatter: {draft: {ne: true}, template: {eq: "post"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            description
            slug
            title
            category
            date
            featured_media
          }
          excerpt
        }
      }
    }
  }
`
