import React from "react";
import { styled } from "@mui/material/styles";
import { Link as GatsbyLink } from "gatsby";
import { useCategoriesList, useSiteMetadata } from "../../../hooks";
import kebabCase from "lodash/kebabCase";
import Link from "@mui/material/Link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const PREFIX = "MenuDraw";

const classes = {
  menuDrawer: `${PREFIX}-menuDrawer`,
  nested: `${PREFIX}-nested`,
  activeLink: `${PREFIX}-activeLink`,
};

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  [`& .${classes.menuDrawer}`]: {
    width: 260,
  },

  [`& .${classes.nested}`]: {
    paddingLeft: theme.spacing(4),
  },

  [`& .${classes.activeLink}`]: {
    color: theme.palette.action.active,
  },
}));

const MenuDraw = ({ openDraw, setOpenDraw }) => {
  const { menu } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <StyledSwipeableDrawer
      anchor="right"
      open={openDraw}
      onClose={() => setOpenDraw(false)}
      onOpen={() => setOpenDraw(true)}
    >
      <List
        component="nav"
        className={classes.menuDrawer}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            导航
          </ListSubheader>
        }
      >
        <ListItemButton
          component={GatsbyLink}
          to={`/page`}
          activeClassName={classes.activeLink}
        >
          <ListItemText primary="文章" />
        </ListItemButton>
        {categories.map((category) => (
          <ListItemButton
            component={GatsbyLink}
            to={`/category/${kebabCase(category.fieldValue)}/`}
            className={classes.nested}
            activeClassName={classes.activeLink}
            key={category.fieldValue}
          >
            <ListItemText primary={category.fieldValue} />
          </ListItemButton>
        ))}
        <ListItemButton
          component={GatsbyLink}
          to={`/archivedBlogPage/`}
          activeClassName={classes.activeLink}
          className={classes.nested}
        >
          <ListItemText primary={"存档文章"} />
        </ListItemButton>

        {menu.map((item) => (
          <React.Fragment key={item.label}>
            {item.path ? (
              <ListItemButton
                component={GatsbyLink}
                to={item.path}
                activeClassName={classes.activeLink}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemButton
                component={Link}
                target={"_blank"}
                rel="noopener"
                href={item.link}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledSwipeableDrawer>
  );
};

export default MenuDraw;
