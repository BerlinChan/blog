import React from "react";
import { styled } from "@mui/material/styles";
import { Link as GatsbyLink } from "gatsby";
import { PAGINATION } from "../../constants";
import { Link, Grid2 } from "@mui/material";

const PREFIX = "Pagination";

const classes = {
  nextNav: `${PREFIX}-nextNav`,
};

const StyledGrid = styled(Grid2)(({ theme }) => ({
  [`& .${classes.nextNav}`]: {
    marginLeft: "auto",
  },
}));

const Pagination = ({
  prevPageName,
  nextPageName,
  prevPagePath,
  nextPagePath,
}) => {
  return (
    <StyledGrid container justifyContent="space-between" wrap="nowrap">
      {prevPagePath ? (
        <Grid2 item>
          <Link
            component={GatsbyLink}
            rel="prev"
            to={prevPagePath}
            variant="h6"
          >
            ← {prevPageName ? prevPageName : PAGINATION.PREV_PAGE}
          </Link>
        </Grid2>
      ) : null}
      {nextPagePath ? (
        <Grid2 item className={classes.nextNav}>
          <Link
            component={GatsbyLink}
            rel="next"
            to={nextPagePath}
            variant="h6"
          >
            {nextPageName ? nextPageName : PAGINATION.NEXT_PAGE} →
          </Link>
        </Grid2>
      ) : null}
    </StyledGrid>
  );
};

export default Pagination;
