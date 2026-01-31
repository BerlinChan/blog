import React from "react";
import { CssBaseline, useMediaQuery, Container, Grid } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { brown, deepOrange } from "@mui/material/colors";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children, featuredContent, noSidebar }) => {
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
      <Header />
      <Container maxWidth="lg">
        {featuredContent}
        <Grid container spacing={5}>
          <Grid item size={{ xs: 12, md: 8 }}>
            {children}
          </Grid>
          {noSidebar ? null : (
            <Grid item size={{ xs: 12, md: 4 }}>
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
