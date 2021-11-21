import React from "react";
import { emphasize } from "@mui/material/styles";
import { Link as GatsbyLink } from "gatsby";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useCategoriesList } from "../../hooks";
import kebabCase from "lodash/kebabCase";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import SidebarCard from "./SidebarCard";

const Categories = (props) => {
  const categories = useCategoriesList();

  return (
    <SidebarCard
      header={
        <React.Fragment>
          <Typography variant="subtitle1">分类</Typography>
          <IconButton
            component={GatsbyLink}
            to={"/categories"}
            aria-label="more"
            size="small"
            title={"全部"}
          >
            <MoreHorizIcon />
          </IconButton>
        </React.Fragment>
      }
      body={categories.map((category, index) => (
        <Link
          component={GatsbyLink}
          to={`/category/${kebabCase(category.fieldValue)}/`}
          display="block"
          variant="body1"
          underline="none"
          noWrap
          key={index}
          sx={{
            padding: (theme) => theme.spacing(1),
            ":hover": {
              backgroundColor: (theme) =>
                emphasize(theme.palette.background.default, 0.1),
            },
          }}
        >
          {`${category.fieldValue} (${category.totalCount})`}
        </Link>
      ))}
    />
  );
};

export default Categories;
