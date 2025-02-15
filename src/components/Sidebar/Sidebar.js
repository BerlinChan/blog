import React from "react";
import { Grid2 } from "@mui/material";
import Categories from "./Categories";
import Tags from "./Tags";

const Sidebar = () => {
  return (
    <Grid2 container spacing={4}>
      <Grid2 item size={{ xs: 12, sm: 6, md: 12 }}>
        <Categories />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 6, md: 12 }}>
        <Tags />
      </Grid2>
    </Grid2>
  );
};

export default Sidebar;
