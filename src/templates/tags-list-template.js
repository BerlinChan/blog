import React from "react";
import { Link as GatsbyLink } from "gatsby";
import kebabCase from "lodash/kebabCase";
import Layout from "../components/Layout";
import { useSiteMetadata, useTagsList } from "../hooks";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const TagsListTemplate = () => {
  const tags = useTagsList();

  return (
    <Layout>
      <Typography component="h2" variant="h4" gutterBottom>
        标签
      </Typography>
      <ul>
        {tags.map((tag) => (
          <li key={tag.fieldValue}>
            <Link
              component={GatsbyLink}
              to={`/tag/${kebabCase(tag.fieldValue)}/`}
              variant="body1"
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TagsListTemplate;

export const Head = () => {
  const { title } = useSiteMetadata();

  return <title>{`标签 - ${title}`}</title>;
};
