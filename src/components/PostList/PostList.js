import React from "react";
import { format } from "date-fns";
import { Link as GatsbyLink } from "gatsby";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardActionArea: {
    marginBottom: theme.spacing(3),
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 200,
  },
  date: {
    marginRight: theme.spacing(1),
  },
  category: {
    marginRight: theme.spacing(0.5),
  },
}));

const PostList = ({ edges }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {edges.map(({ node }, index) => (
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
                  {format(new Date(node.frontmatter.date), "yyyy-MM-dd")} - moment:
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
              <Hidden xsDown>
                <CardMedia
                  className={classes.cardMedia}
                  image={
                    node.frontmatter.featured_media.childImageSharp.fixed.src
                  }
                  title={node.frontmatter.title}
                />
              </Hidden>
            )}
          </Card>
        </CardActionArea>
      ))}
    </React.Fragment>
  );
};

export default PostList;
