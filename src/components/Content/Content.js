import React from "react";
import { styled } from "@mui/material/styles";
import "./github-markdown.css";

const PREFIX = "Content";

const classes = {
  content: `${PREFIX}-content`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.content}`]: {
    fontSize: "1.125rem",
    lineHeight: 1.6,
    backgroundColor: "initial",
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
}));

const Content = ({ html }) => {
  return (
    <Root
      className={`markdown-body ${classes.content}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Content;
