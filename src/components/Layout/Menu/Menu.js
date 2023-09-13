import React from "react";
import { styled } from "@mui/material/styles";
import { Link as GatsbyLink } from "gatsby";
import { useCategoriesList, useSiteMetadata } from "../../../hooks";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Menu from "material-ui-popup-state/HoverMenu";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import kebabCase from "lodash/kebabCase";

const PREFIX = "MenuComponent";

const classes = {
  menuDropdown: `${PREFIX}-menuDropdown`,
  menuLink: `${PREFIX}-menuLink`,
  toolbarLink: `${PREFIX}-toolbarLink`,
  activeLink: `${PREFIX}-activeLink`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
  [`& .${classes.menuDropdown}`]: {
    width: 200,
  },

  [`& .${classes.menuLink}`]: {
    width: "100%",
  },

  [`& .${classes.toolbarLink}`]: {
    padding: theme.spacing(1),
  },

  [`& .${classes.activeLink}`]: {
    color: theme.palette.action.active,
  },
}));

const MenuComponent = () => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "menuListGrow",
  });
  const { menu } = useSiteMetadata();
  const categories = useCategoriesList();

  return (
    <Root>
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
        {categories.map((category) => (
          <MenuItem key={category.fieldValue}>
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

      {menu.map((item) => (
        <React.Fragment key={item.label}>
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
    </Root>
  );
};

export default MenuComponent;
