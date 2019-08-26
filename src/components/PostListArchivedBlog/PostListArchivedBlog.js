import React from 'react'
import moment from 'moment'
import { Link as GatsbyLink } from 'gatsby'
import { useSiteMetadata } from '../../hooks'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
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
    width: 200,
  },
}))

const PostListArchivedBlog = ({ edges }) => {
  const classes = useStyles()
  // const { archivedBlogUrl } = useSiteMetadata() // for categories link

  return <React.Fragment>
    {edges.map(({ node }, index) => (
      <CardActionArea component={GatsbyLink} to={node.path} key={index}
                      className={classes.cardActionArea}>
        <Card className={classes.card}>
          <Box className={classes.cardDetails}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                {moment(node.date).utcOffset(8).format('YYYY-MM-DD')}
                {node.categories.map((item, index) => item.name)}
              </Typography>
              <Typography component="h2" variant="h5">
                {node.title}
              </Typography>
              <Typography variant="subtitle1" paragraph
                          dangerouslySetInnerHTML={{ __html: node.excerpt }}>
              </Typography>
              <Typography variant="subtitle1" color="primary">
                阅读
              </Typography>
            </CardContent>
          </Box>
          {node.featured_media && <Hidden xsDown>
            <CardMedia className={classes.cardMedia}
                       image={node.featured_media.source_url}
                       title={node.title}/>
          </Hidden>}
        </Card>
      </CardActionArea>
    ))}
  </React.Fragment>
}

export default PostListArchivedBlog
