import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  Typography,
  Link,
  Slide,
  useScrollTrigger,
  IconButton,
} from "@mui/material";
import Menu from "../Menu";
import MenuDraw from "../MenuDraw";
import { useSiteMetadata } from "../../../hooks";
import { Link as GatsbyLink, withPrefix } from "gatsby";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import { StaticImage } from "gatsby-plugin-image";

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
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar color={"default"}>
          <Toolbar sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Link
              component={GatsbyLink}
              to={withPrefix("/")}
              sx={{ marginRight: theme.spacing(2) }}
            >
              <Avatar>
                <StaticImage
                  src="../../../images/photo.jpg"
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
              sx={{ color: theme.palette.primary.main }}
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
            <Box sx={{ marginLeft: "auto" }} display="flex" alignItems="center">
              <Menu sx={{ display: { xs: "none", sm: "block" } }} />
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpenDraw(true)}
                size="large"
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon color={"primary"} />
              </IconButton>
              {props.setColorMode ? (
                theme.palette.mode === "light" ? (
                  <IconButton
                    color="primary"
                    aria-label="Activate dark mode"
                    onClick={() => props.setColorMode("dark")}
                    size="large"
                  >
                    <Brightness4Icon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="Activate light mode"
                    onClick={() => props.setColorMode("light")}
                    size="large"
                  >
                    <BrightnessHighIcon />
                  </IconButton>
                )
              ) : null}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar sx={{ marginBottom: theme.spacing(3) }} />
      <MenuDraw openDraw={openDraw} setOpenDraw={setOpenDraw} />
    </React.Fragment>
  );
};

export default Header;
