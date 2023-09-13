import React from "react";
import { styled } from "@mui/material/styles";
import { Link as GatsbyLink } from "gatsby";
import { useCategoriesList, useSiteMetadata } from "../../../hooks";
import kebabCase from "lodash/kebabCase";
import Link from "@mui/material/Link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
        <ListItem
          button
          component={GatsbyLink}
          to={`/page`}
          activeClassName={classes.activeLink}
        >
          <ListItemText primary="文章" />
        </ListItem>
        {categories.map((category) => (
          <ListItem
            button
            component={GatsbyLink}
            to={`/category/${kebabCase(category.fieldValue)}/`}
            className={classes.nested}
            activeClassName={classes.activeLink}
            key={category.fieldValue}
          >
            <ListItemText primary={category.fieldValue} />
          </ListItem>
        ))}
        <ListItem
          button
          component={GatsbyLink}
          to={`/archivedBlogPage/`}
          activeClassName={classes.activeLink}
          className={classes.nested}
        >
          <ListItemText primary={"存档文章"} />
        </ListItem>

        {menu.map((item) => (
          <React.Fragment key={item.label}>
            {item.path ? (
              <ListItem
                button
                component={GatsbyLink}
                to={item.path}
                activeClassName={classes.activeLink}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ) : (
              <ListItem
                button
                component={Link}
                target={"_blank"}
                rel="noopener"
                href={item.link}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledSwipeableDrawer>
  );
};

export default MenuDraw;
