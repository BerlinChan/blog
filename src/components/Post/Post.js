import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import { useSiteMetadata } from '../../hooks'
import { FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton } from 'react-share'
import SvgIcons from '../../assets/SvgIcons'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  date: {
    marginRight: theme.spacing(2),
  },
  category: {
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
  shareButton: {
    marginLeft: theme.spacing(1),
    '& .SocialMediaShareButton': {
      display: 'flex',
    },
  },
}))

const Post = ({ isArchivedBlogPost, post, children }) => {
  const classes = useStyles()
  const { url: siteUrl, archivedBlogUrl, UTC } = useSiteMetadata()
  const { categorySlugs, tagSlugs } = post.fields
  const { categories, tags, title, date, slug, description } = post.frontmatter

  return (
    <React.Fragment>
      <Typography component="h2" variant={'h4'} gutterBottom>{title}</Typography>
      <Typography variant={'body1'} display={'inline'} color="textSecondary"
                  className={classes.date}>
        {moment.utc(date).utcOffset(UTC).format('YYYY-MM-DD HH:mm')}
      </Typography>
      {categorySlugs.map((categorySlug, index) =>
        <Typography variant={'body1'} display={'inline'} color="textSecondary"
                    className={classes.category} key={index}>
          {isArchivedBlogPost ?
            <Link href={`${archivedBlogUrl}${categorySlug}`} target={'_blank'} rel="noopener">
              {categories[index]}
            </Link> :
            <Link component={GatsbyLink} to={categorySlug}>
              {categories[index]}
            </Link>
          }
        </Typography>
      )}

      {children}

      <Box mt={2} className={classes.tagList}>
        {tags.map((tag, index) => (
          isArchivedBlogPost ?
            <Chip key={index} label={tag} className={classes.chip} variant="outlined"
                  component={Link} href={`${archivedBlogUrl}${tagSlugs[index]}`}
                  target={'_blank'} rel="noopener" clickable/> :
            <Chip key={index} label={tag} className={classes.chip} variant="outlined"
                  component={GatsbyLink} to={tagSlugs[index]} clickable/>
        ))}
      </Box>

      <Box mt={2} display={'flex'} alignItems={'center'}>
        <Typography component={'h2'} variant={'h6'} display={'inline'}>分享</Typography>
        <IconButton className={classes.shareButton}>
          <FacebookShareButton url={`${siteUrl}${slug}`}
                               quote={description}>
            <SvgIcons name={'facebook'}/>
          </FacebookShareButton>
        </IconButton>
        <IconButton className={classes.shareButton}>
          <TwitterShareButton url={`${siteUrl}${slug}`}
                              title={title}>
            <SvgIcons name={'twitter'}/>
          </TwitterShareButton>
        </IconButton>
        <IconButton className={classes.shareButton}>
          <LinkedinShareButton url={`${siteUrl}${slug}`}>
            <SvgIcons name={'linkedIn'}/>
          </LinkedinShareButton>
        </IconButton>
        <IconButton className={classes.shareButton}>
          <TelegramShareButton url={`${siteUrl}${slug}`}
                               title={title}>
            <SvgIcons name={'telegram'}/>
          </TelegramShareButton>
        </IconButton>
      </Box>
    </React.Fragment>
  )
}

export default Post
