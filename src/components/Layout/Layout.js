import React from "react";
import { CssBaseline, useMediaQuery, Container, Grid2 } from "@mui/material";
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
        <Grid2 container spacing={5}>
          <Grid2 item size={{ xs: 12, md: 8 }}>
            {children}
          </Grid2>
          {noSidebar ? null : (
            <Grid2 item size={{ xs: 12, md: 4 }}>
              <Sidebar />
            </Grid2>
          )}
        </Grid2>
        <Footer />
      </Container>
      <ScrollTop />
    </ThemeProvider>
  );
};

export default Layout;
