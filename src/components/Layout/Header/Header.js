import React from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
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

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  toolbarMenu: {
    marginLeft: "auto",
  },
  toolbarHolder: {
    marginBottom: theme.spacing(3),
  },
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
  const classes = useStyles();
  const {
    title: siteTitle,
    author: { name },
  } = useSiteMetadata();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Header;
