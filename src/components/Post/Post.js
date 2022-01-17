import React from "react";
import { styled } from '@mui/material/styles';
import { Link as GatsbyLink } from "gatsby";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useSiteMetadata } from "../../hooks";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import SvgIcons from "../../utils/SvgIcons";
import ButtonBase from "@mui/material/ButtonBase";

const PREFIX = 'Post';

const classes = {
  date: `${PREFIX}-date`,
  category: `${PREFIX}-category`,
  tagList: `${PREFIX}-tagList`,
  chip: `${PREFIX}-chip`,
  shareButton: `${PREFIX}-shareButton`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.date}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.category}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.tagList}`]: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
  },

  [`& .${classes.chip}`]: {
    margin: theme.spacing(0.5),
  },

  [`& .${classes.shareButton}`]: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: "50%",
  }
}));

const Post = ({ isArchivedBlogPost, post, children }) => {

  const { siteUrl, archivedBlogUrl } = useSiteMetadata();
  const { categorySlugs, tagSlugs } = post.fields;
  const { categories, tags, title, date, slug, description } = post.frontmatter;

  return (
    <Root>
      <Typography component="h2" variant={"h4"} gutterBottom>
        {title}
      </Typography>
      <Typography
        variant={"body1"}
        display={"inline"}
        color="textSecondary"
        className={classes.date}
      >
        {format(new Date(date), "yyyy-MM-dd HH:mm")}
      </Typography>
      {categorySlugs.map((categorySlug, index) => (
        <Typography
          variant={"body1"}
          display={"inline"}
          color="textSecondary"
          className={classes.category}
          key={categorySlug}
        >
          {isArchivedBlogPost ? (
            <Link
              href={`${archivedBlogUrl}${categorySlug}`}
              target={"_blank"}
              rel="noopener"
            >
              {categories[index]}
            </Link>
          ) : (
            <Link component={GatsbyLink} to={categorySlug}>
              {categories[index]}
            </Link>
          )}
        </Typography>
      ))}

      {children}

      <Box mt={2} className={classes.tagList}>
        {tags.map((tag, index) =>
          isArchivedBlogPost ? (
            <Chip
              key={tag}
              label={tag}
              className={classes.chip}
              variant="outlined"
              component={Link}
              href={`${archivedBlogUrl}${tagSlugs[index]}`}
              target={"_blank"}
              rel="noopener"
              clickable
            />
          ) : (
            <Chip
              key={tag}
              label={tag}
              className={classes.chip}
              variant="outlined"
              component={GatsbyLink}
              to={tagSlugs[index]}
              clickable
            />
          )
        )}
      </Box>

      <Box mt={2} display={"flex"} alignItems={"center"}>
        <Typography component={"h2"} variant={"h6"} display={"inline"}>
          分享
        </Typography>
        <ButtonBase
          className={classes.shareButton}
          component={FacebookShareButton}
          resetButtonStyle={false}
          url={`${siteUrl}${slug}`}
          quote={description}
        >
          <SvgIcons name={"facebook"} />
        </ButtonBase>
        <ButtonBase
          className={classes.shareButton}
          component={TwitterShareButton}
          resetButtonStyle={false}
          url={`${siteUrl}${slug}`}
          title={title}
        >
          <SvgIcons name={"twitter"} />
        </ButtonBase>
        <ButtonBase
          className={classes.shareButton}
          component={LinkedinShareButton}
          resetButtonStyle={false}
          url={`${siteUrl}${slug}`}
        >
          <SvgIcons name={"linkedIn"} />
        </ButtonBase>
        <ButtonBase
          className={classes.shareButton}
          component={TelegramShareButton}
          resetButtonStyle={false}
          url={`${siteUrl}${slug}`}
          title={title}
        >
          <SvgIcons name={"telegram"} />
        </ButtonBase>
      </Box>
    </Root>
  );
};

export default Post;
