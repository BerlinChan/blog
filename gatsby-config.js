const siteConfig = require("./config.js");

module.exports = {
  pathPrefix: siteConfig.pathPrefix,
  siteMetadata: {
    siteUrl: siteConfig.siteUrl,
    archivedBlogUrl: siteConfig.archivedBlogUrl,
    title: siteConfig.title,
    subtitle: siteConfig.subtitle,
    UTC: siteConfig.UTC,
    postsPerPage: siteConfig.postsPerPage,
    disqusShortname: siteConfig.disqusShortname,
    menu: siteConfig.menu,
    author: siteConfig.author,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/archived-blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./content",
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
                title
                description: subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) =>
                Object.assign({}, edge.node.frontmatter, {
                  description:
                    edge.node.frontmatter.description || edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              ),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        description
                      }
                      excerpt(pruneLength: 70)
                    }
                  }
                }
              }
            `,
            output: siteConfig.author.contacts.rss,
            title: `${siteConfig.title} RSS Feed`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        excerpt_separator: `<!-- endExcerpt -->`,
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              quality: 60,
              maxWidth: 760,
              withWebp: true,
            },
          },
          {
            // MUST before gatsby-remark-responsive-iframe
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 600,
              ratio: 1.77,
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: { wrapperStyle: "margin-bottom: 1.0725rem" },
          },
          `gatsby-remark-copy-linked-files`,
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
          "gatsby-remark-smartypants",
          "gatsby-remark-external-links",
        ],
      },
    },
    "gatsby-transformer-json",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-material-ui",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [siteConfig.googleAnalyticsId],
        pluginConfig: {
          head: true,
        },
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteConfig.title,
        short_name: siteConfig.title,
        start_url: "/",
        background_color: "#fafafa",
        theme_color: "#ff5722",
        display: "standalone",
        icon: "src/images/photo.jpg",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-optimize-svgs",
  ],
};
