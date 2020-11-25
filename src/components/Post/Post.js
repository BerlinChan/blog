import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { format } from "date-fns";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useSiteMetadata } from "../../hooks";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import SvgIcons from "../../assets/SvgIcons";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  date: {
    marginRight: theme.spacing(2),
  },
  category: {
    marginRight: theme.spacing(1),
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  shareButton: {
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: "50%",
  },
}));

const Post = ({ isArchivedBlogPost, post, children }) => {
  const classes = useStyles();
  const { url: siteUrl, archivedBlogUrl } = useSiteMetadata();
  const { categorySlugs, tagSlugs } = post.fields;
  const { categories, tags, title, date, slug, description } = post.frontmatter;

  return (
    <React.Fragment>
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
          key={index}
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
              key={index}
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
              key={index}
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
    </React.Fragment>
  );
};

export default Post;
