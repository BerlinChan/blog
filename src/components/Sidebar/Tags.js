import React from "react";
import { Link as GatsbyLink } from "gatsby";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTagsList } from "../../hooks";
import kebabCase from "lodash/kebabCase";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import SidebarCard from "./SidebarCard";

const Tags = (props) => {
  const tagsList = useTagsList()
    .map((tag) => ({ ...tag, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, 20);

  return (
    <SidebarCard
      header={
        <React.Fragment>
          <Typography variant="subtitle1">标签</Typography>
          <IconButton
            component={GatsbyLink}
            to={"/tags"}
            aria-label="more"
            size="small"
            title={"全部"}
          >
            <MoreHorizIcon />
          </IconButton>
        </React.Fragment>
      }
      body={
        <Box
          display="flex"
          flexWrap="wrap"
          sx={{
            padding: (theme) => theme.spacing(1),
          }}
        >
          {tagsList.map((tag, index) => (
            <Link
              component={GatsbyLink}
              to={`/tag/${kebabCase(tag.fieldValue)}/`}
              display="block"
              variant="body1"
              underline="none"
              noWrap
              key={index}
              sx={{ margin: (theme) => theme.spacing(0, 3, 0.5, 0) }}
            >
              {tag.fieldValue}
            </Link>
          ))}
        </Box>
      }
    />
  );
};

export default Tags;
