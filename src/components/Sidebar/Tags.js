import React from "react";
import { styled } from "@mui/material/styles";
import { Link as GatsbyLink } from "gatsby";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTagsList } from "../../hooks";
import kebabCase from "lodash/kebabCase";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import SidebarCard from "./SidebarCard";

const PREFIX = "Tags";

const classes = {
  tagLink: `${PREFIX}-tagLink`,
  activeLink: `${PREFIX}-activeLink`,
};

const StyledLink = styled(Link)(({ theme }) => ({
  [`&.${classes.tagLink}`]: {
    margin: theme.spacing(0, 3, 0.5, 0),
  },

  [`&.${classes.activeLink}`]: {
    color: theme.palette.action.active,
  },
}));

const Tags = (props) => {
  const tagsList = useTagsList()
    .map((tag) => ({ ...tag, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, 20);

  return (
    <SidebarCard
      header={
        <React.Fragment>
          <Typography variant="subtitle1">随机标签</Typography>
          <IconButton
            component={GatsbyLink}
            to={"/tags"}
            aria-label="more"
            size="small"
            title={"全部"}
          >
            <MoreHorizIcon />
          </IconButton>
        </React.Fragment>
      }
      body={
        <Box
          display="flex"
          flexWrap="wrap"
          sx={{
            p: 1,
          }}
        >
          {tagsList.map((tag) => (
            <StyledLink
              component={GatsbyLink}
              to={`/tag/${kebabCase(tag.fieldValue)}/`}
              display="block"
              variant="body1"
              underline="none"
              noWrap
              key={tag.fieldValue}
              className={classes.tagLink}
              activeClassName={classes.activeLink}
            >
              {tag.fieldValue}
            </StyledLink>
          ))}
        </Box>
      }
    />
  );
};

export default Tags;
