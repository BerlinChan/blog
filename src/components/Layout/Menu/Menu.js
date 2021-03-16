import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { useCategoriesList, useSiteMetadata } from "../../../hooks";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "material-ui-popup-state/HoverMenu";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import kebabCase from "lodash/kebabCase";

const useStyles = makeStyles((theme) => ({
  menuDropdown: {
    width: 200,
  },
  menuLink: {
    width: "100%",
  },
  toolbarLink: {
    padding: theme.spacing(1),
  },
  activeLink: {
    color: theme.palette.action.active,
  },
}));

export default () => {
  const classes = useStyles();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "menuListGrow",
  });
  const { menu } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <React.Fragment>
      <Link
        component={GatsbyLink}
        to={`/page`}
        noWrap
        variant="body1"
        underline="none"
        className={classes.toolbarLink}
        activeClassName={classes.activeLink}
        {...bindHover(popupState)}
      >
        文章
      </Link>
      <Menu
        {...bindMenu(popupState)}
        classes={{ paper: classes.menuDropdown }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {categories.map((category, index) => (
          <MenuItem key={index}>
            <Link
              component={GatsbyLink}
              to={`/category/${kebabCase(category.fieldValue)}/`}
              display="block"
              underline={"none"}
              className={classes.menuLink}
              activeClassName={classes.activeLink}
              noWrap
            >
              {category.fieldValue}
            </Link>
          </MenuItem>
        ))}
        <MenuItem>
          <Link
            component={GatsbyLink}
            to={`/archivedBlogPage/`}
            display="block"
            underline={"none"}
            className={classes.menuLink}
            activeClassName={classes.activeLink}
            noWrap
          >
            存档文章
          </Link>
        </MenuItem>
      </Menu>

      {menu.map((item, index) => (
        <React.Fragment key={index}>
          {item.path ? (
            <Link
              component={GatsbyLink}
              to={item.path}
              activeClassName={classes.activeLink}
              noWrap
              variant="body1"
              className={classes.toolbarLink}
              underline="none"
            >
              {item.label}
            </Link>
          ) : (
            <Link
              noWrap
              variant="body1"
              className={classes.toolbarLink}
              target={"_blank"}
              rel="noopener"
              href={item.link}
              underline="none"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
