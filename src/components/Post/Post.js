import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core'
import { useSiteMetadata } from '../../hooks'

const useStyles = makeStyles(theme => ({
  date: {
    marginRight: theme.spacing(1),
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  content: {
    fontSize: 18,
    lineHeight: 1.6,
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '& blockquote': {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.grey[200],
    },
  },
}))

const Post = ({ isArchivedBlogPost, post }) => {
  const classes = useStyles()
  const { archivedBlogUrl, UTC } = useSiteMetadata()
  const { html } = post
  const { categorySlug, tagSlugs } = post.fields
  const { category, tags, title, date } = post.frontmatter

  return (
    <React.Fragment>
      <Typography component="h2" variant={'h4'}>{title}</Typography>
      <Typography variant={'body1'} display={'inline'} color="textSecondary"
                  className={classes.date}>
        {moment.utc(date).utcOffset(UTC).format('YYYY-MM-DD HH:mm')}
      </Typography>
      <Typography variant={'body1'} display={'inline'} color="textSecondary">
        <Link component={GatsbyLink} to={categorySlug}>
          {category}
        </Link>
      </Typography>

      <div className={classes.content} dangerouslySetInnerHTML={{ __html: html }}/>

      <Box className={classes.tagList}>
        {tags.map((tag, index) => (
          isArchivedBlogPost ?
            <Chip key={index} label={tag} className={classes.chip} variant="outlined"
                  component={Link} href={`${archivedBlogUrl}${tagSlugs[index]}`}
                  target={'_blank'} rel="noopener" clickable/> :
            <Chip key={index} label={tag} className={classes.chip} variant="outlined"
                  component={GatsbyLink} to={tagSlugs[index]} clickable/>
        ))}
      </Box>
    </React.Fragment>
  )
}

export default Post
