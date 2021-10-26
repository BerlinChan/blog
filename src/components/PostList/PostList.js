import React from "react";
import { styled } from '@mui/material/styles';
import { format } from "date-fns";
import { Link as GatsbyLink } from "gatsby";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import CardMedia from "@mui/material/CardMedia";
import { getSrc } from "gatsby-plugin-image"

const PREFIX = 'PostList';

const classes = {
  cardActionArea: `${PREFIX}-cardActionArea`,
  card: `${PREFIX}-card`,
  cardDetails: `${PREFIX}-cardDetails`,
  cardMedia: `${PREFIX}-cardMedia`,
  date: `${PREFIX}-date`,
  category: `${PREFIX}-category`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.cardActionArea}`]: {
    marginBottom: theme.spacing(3),
  },

  [`& .${classes.card}`]: {
    display: "flex",
  },

  [`& .${classes.cardDetails}`]: {
    flex: 1,
  },

  [`& .${classes.cardMedia}`]: {
    width: 200,
  },

  [`& .${classes.date}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.category}`]: {
    marginRight: theme.spacing(0.5),
  }
}));

const PostList = ({ nodes }) => {


  return (
    <Root>
      {nodes.map((node, index) => (
        <CardActionArea
          component={GatsbyLink}
          to={node.fields.slug}
          key={index}
          className={classes.cardActionArea}
        >
          <Card className={classes.card}>
            <Box className={classes.cardDetails}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className={classes.date}
                  display={"inline"}
                >
                  {format(new Date(node.frontmatter.date), "yyyy-MM-dd")}
                </Typography>
                {node.frontmatter.categories.map((category, index) => (
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    display={"inline"}
                    className={classes.category}
                    key={index}
                  >
                    {category}
                  </Typography>
                ))}
                <Typography component="h2" variant="h5">
                  {node.frontmatter.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {node.frontmatter.description || node.excerpt}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  阅读
                </Typography>
              </CardContent>
            </Box>
            {node.frontmatter.featured_media && (
              <Hidden smDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={getSrc(
                    node.frontmatter.featured_media.childImageSharp.gatsbyImageData
                    )}
                  title={node.frontmatter.title}
                />
              </Hidden>
            )}
          </Card>
        </CardActionArea>
      ))}
    </Root>
  );
};

export default PostList;
