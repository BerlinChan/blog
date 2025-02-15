import React from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Link as GatsbyLink } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const FeaturedPost = ({ featuredPostNode }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: "grid",
        marginBottom: theme.spacing(4),
        overflow: "hidden",
      }}
    >
      <GatsbyImage
        style={{ gridArea: "1/1" }}
        layout="fullWidth"
        aspectRatio={3 / 1}
        image={getImage(
          featuredPostNode.frontmatter.featured_media.childImageSharp
        )}
        alt=""
      />
      <ButtonBase
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "start",
          gridArea: "1/1",
          padding: theme.spacing(3),
          backgroundColor: alpha(theme.palette.background.paper, 0.3),
          [theme.breakpoints.up("md")]: {
            padding: theme.spacing(6, 0, 6, 6),
          },
        }}
        focusRipple
        component={GatsbyLink}
        to={featuredPostNode.frontmatter.slug}
      >
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          {featuredPostNode.frontmatter.title}
        </Typography>
        <Typography variant="h5" color="inherit" component="p">
          {featuredPostNode.frontmatter.description}
        </Typography>
      </ButtonBase>
    </Paper>
  );
};

export default FeaturedPost;
