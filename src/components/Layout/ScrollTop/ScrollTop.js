import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useScrollTrigger, Zoom, Fab } from "@mui/material";

const ScrollTop = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation">
        <Fab
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          color="secondary"
          size="medium"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ScrollTop;
