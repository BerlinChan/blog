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
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))

const Post = ({ isArchivedBlogPost, post }) => {
  const classes = useStyles()
  const { archivedBlogUrl } = useSiteMetadata()
  const { html } = post
  const { categorySlug, tagSlugs } = post.fields
  const { category, tags, title, date } = post.frontmatter

  return (
    <React.Fragment>
      <Typography component="h2" variant={'h4'}>{title}</Typography>
      <Typography variant={'body1'} display={'inline'} color="textSecondary">
        {moment(date).format('YYYY-MM-DD HH:mm')}
      </Typography>
      <Typography variant={'body1'} display={'inline'} color="textSecondary">
        <Link component={GatsbyLink} to={categorySlug}>
          {category}
        </Link>
      </Typography>

      <Typography component={'div'} paragraph variant={'body1'}>
        <div dangerouslySetInnerHTML={{ __html: html }}/>
      </Typography>

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
