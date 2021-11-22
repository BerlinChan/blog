import React from "react";
import { emphasize } from "@mui/material/styles";
import Box from "@mui/material/Box";

const SidebarCard = ({ header, body, ...props }) => {
  return (
    <Box {...props}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: (theme) => theme.spacing(0.5, 1),
          backgroundColor: (theme) =>
            emphasize(theme.palette.background.paper, 0.1),
        }}
      >
        {header}
      </Box>
      {body}
    </Box>
  );
};

export default SidebarCard;
