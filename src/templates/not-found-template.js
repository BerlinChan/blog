import React from "react";
import Layout from "../components/Layout";
import { useSiteMetadata } from "../hooks";
import { Typography } from "@mui/material";

const NotFoundTemplate = () => {
  return (
    <Layout>
      <Typography variant="subtitle1" gutterBottom>
        NOT FOUND
      </Typography>
      <Typography component="h2" variant="h4">
        页面不存在
      </Typography>
    </Layout>
  );
};

export default NotFoundTemplate;

export const Head = () => {
  const { title } = useSiteMetadata();

  return <title>{`Not Found - ${title}`}</title>;
};
