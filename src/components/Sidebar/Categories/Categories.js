import React from "react";
import { styled, useTheme, emphasize } from "@mui/material/styles";
import { Link as GatsbyLink } from "gatsby";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useCategoriesList } from "../../../hooks";
import kebabCase from "lodash/kebabCase";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";

const PREFIX = "Categories";

const classes = {
  link: `${PREFIX}-link`,
  activeLink: `${PREFIX}-activeLink`,
};

const StyledLink = styled(Link)(({ theme }) => ({
  [`&.${classes.link}`]: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: emphasize(theme.palette.background.default, 0.1),
    },
  },

  [`&.${classes.activeLink}`]: {
    color: theme.palette.action.active,
  },
}));

const Categories = (props) => {
  const theme = useTheme();
  const categories = useCategoriesList();

  return (
    <Box {...props}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: theme.spacing(0.5, 1),
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="subtitle1">分类</Typography>
        <IconButton
          component={GatsbyLink}
          to={"/categories"}
          aria-label="more"
          size="small"
          title={"全部"}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>
      {categories.map((category, index) => (
        <StyledLink
          component={GatsbyLink}
          to={`/category/${kebabCase(category.fieldValue)}/`}
          display="block"
          variant="body1"
          underline="none"
          noWrap
          key={index}
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          {`${category.fieldValue} (${category.totalCount})`}
        </StyledLink>
      ))}
    </Box>
  );
};

export default Categories;
