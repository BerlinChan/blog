import React from "react";
import { Helmet } from "react-helmet";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import Container from "@mui/material/Container";
import { brown, deepOrange } from "@mui/material/colors";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ title, children, featuredContent, noSidebar }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
            primary: deepOrange,
            secondary: brown,
          },
        })
      ),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet defer={false}>
        <html lang="zh-Hans" prefix="og: http://ogp.me/ns#" />
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Header />
      <Container maxWidth="lg">
        {featuredContent}
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            {children}
          </Grid>
          {noSidebar ? null : (
            <Grid item xs={12} md={4}>
              <Sidebar />
            </Grid>
          )}
        </Grid>
        <Footer />
      </Container>
      <ScrollTop />
    </ThemeProvider>
  );
};

export default Layout;
