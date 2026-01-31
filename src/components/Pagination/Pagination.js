import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { PAGINATION } from "../../constants";
import { Link, Grid, styled } from "@mui/material";

const PREFIX = "Pagination";

const classes = {
  nextNav: `${PREFIX}-nextNav`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
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
        <Grid item>
          <Link
            component={GatsbyLink}
            rel="prev"
            to={prevPagePath}
            variant="h6"
          >
            ← {prevPageName ? prevPageName : PAGINATION.PREV_PAGE}
          </Link>
        </Grid>
      ) : null}
      {nextPagePath ? (
        <Grid item className={classes.nextNav}>
          <Link
            component={GatsbyLink}
            rel="next"
            to={nextPagePath}
            variant="h6"
          >
            {nextPageName ? nextPageName : PAGINATION.NEXT_PAGE} →
          </Link>
        </Grid>
      ) : null}
    </StyledGrid>
  );
};

export default Pagination;
