import React from "react";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Slide from "@mui/material/Slide";
import Hidden from "@mui/material/Hidden";
import Menu from "../Menu";
import MenuDraw from "../MenuDraw";
import { useSiteMetadata } from "../../../hooks";
import { Link as GatsbyLink, withPrefix } from "gatsby";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import { StaticImage } from "gatsby-plugin-image";

const PREFIX = 'Header';

const classes = {
  avatar: `${PREFIX}-avatar`,
  toolbar: `${PREFIX}-toolbar`,
  toolbarTitle: `${PREFIX}-toolbarTitle`,
  toolbarMenu: `${PREFIX}-toolbarMenu`,
  toolbarHolder: `${PREFIX}-toolbarHolder`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.avatar}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.toolbar}`]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  [`& .${classes.toolbarTitle}`]: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },

  [`& .${classes.toolbarMenu}`]: {
    marginLeft: "auto",
  },

  [`& .${classes.toolbarHolder}`]: {
    marginBottom: theme.spacing(3),
  }
}));

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 400,
  });
  const triggerElevation = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {React.cloneElement(children, {
        elevation: triggerElevation ? 4 : 0,
      })}
    </Slide>
  );
};

const Header = (props) => {
  const [openDraw, setOpenDraw] = React.useState(false);
  const theme = useTheme();

  const {
    title: siteTitle,
    author: { name },
  } = useSiteMetadata();

  return (
    <Root>
      <HideOnScroll {...props}>
        <AppBar color={"default"}>
          <Toolbar className={classes.toolbar}>
            <Link
              component={GatsbyLink}
              to={withPrefix("/")}
              className={classes.avatar}
            >
              <Avatar>
                <StaticImage
                  src='../../../images/photo.jpg'
                  alt={name}
                  layout="fixed"
                  width={40}
                  height={40}
                />
              </Avatar>
            </Link>
            <Link
              component={GatsbyLink}
              to={withPrefix("/")}
              className={classes.toolbarTitle}
              underline="none"
            >
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="left"
                noWrap
              >
                {siteTitle}
              </Typography>
            </Link>
            <Box className={classes.toolbarMenu}>
              <Hidden smDown>
                <Menu />
              </Hidden>
              <Hidden smUp>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setOpenDraw(true)}
                  size="large">
                  <MenuIcon color={"primary"} />
                </IconButton>
              </Hidden>
              {theme.palette.mode === "light" ? (
                <IconButton
                  color="primary"
                  aria-label="Activate dark mode"
                  onClick={() => props.setColorMode("dark")}
                  size="large">
                  <Brightness4Icon />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  aria-label="Activate light mode"
                  onClick={() => props.setColorMode("light")}
                  size="large">
                  <BrightnessHighIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar className={classes.toolbarHolder} />
      <MenuDraw openDraw={openDraw} setOpenDraw={setOpenDraw} />
    </Root>
  );
};

export default Header;
