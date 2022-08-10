import React from "react";
import { useSiteMetadata } from "../../hooks";

const OpenGraph = (props) => {
  const {
    title: siteTitle,
    author: { name: siteAuthorName },
  } = useSiteMetadata();
  const { title, url, description, type, image } = props;

  return (
    <>
      {description && <meta name="description" content={description} />}

      {/* Open Graph for Facebook & Twitter */}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteTitle} />
      {type && <meta property="og:type" content={type} />}
      <meta property="article:author" content={siteAuthorName} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image.url} />}
      {image && <meta property="og:image:secure_url" content={image.url} />}
      {image && <meta property="og:image:width" content={image.width} />}
      {image && <meta property="og:image:height" content={image.height} />}

      {/*twitter card*/}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@BerlinChanCom" />
      <meta name="twitter:creator" content="@BerlinChanCom" />
    </>
  );
};

export default OpenGraph;
