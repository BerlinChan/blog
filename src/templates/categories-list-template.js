import React from "react";
import { Link as GatsbyLink } from "gatsby";
import Link from "@mui/material/Link";
import kebabCase from "lodash/kebabCase";
import Layout from "../components/Layout";
import { useCategoriesList, useSiteMetadata } from "../hooks";
import Typography from "@mui/material/Typography";

const CategoriesListTemplate = () => {
  const categories = useCategoriesList();

  return (
    <Layout>
      <Typography component={"h2"} variant={"h4"} gutterBottom>
        文章分类
      </Typography>
      <ul>
        {categories.map((category) => (
          <li key={category.fieldValue}>
            <Link
              component={GatsbyLink}
              to={`/category/${kebabCase(category.fieldValue)}/`}
              variant={"body1"}
            >
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default CategoriesListTemplate;

export const Head = () => {
  const { title } = useSiteMetadata();

  return <title>{`文章分类 - ${title}`}</title>;
};
