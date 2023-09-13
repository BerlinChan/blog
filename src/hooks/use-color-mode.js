import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const useColorMode = () => {
  const localStorage = typeof window !== "undefined" && window.localStorage;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)",{
    noSsr: true,
  });
  const initialState =
    (localStorage && localStorage.getItem("colorMode")) ||
    (prefersDarkMode ? "dark" : "light");
  const [colorMode, setColorMode] = useState(initialState);
  useEffect(
    () => localStorage && localStorage.setItem("colorMode", colorMode),
    [localStorage, colorMode]
  );

  return [colorMode, setColorMode];
};

export default useColorMode;
