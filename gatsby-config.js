const siteConfig = {
  title: "陈柏林的Blog",
  googleAnalyticsId: "UA-43244265-2",
  author: {
    name: "陈柏林",
    bio: "前端开发工程师、摄影师，理想主义与黑客精神",
    contacts: {
      twitter: "https://www.twitter.com/BerlinChanCom",
      facebook: "https://www.facebook.com/berlinchancom",
      github: "https://github.com/BerlinChan",
      linkedIn: "https://www.linkedin.com/in/berlinchan",
      youtube: "https://www.youtube.com/user/berlinchancom",
      email: "mailto:berlinchancom@gmail.com",
      rss: "/rss.xml",
    },
  },
};

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: "https://www.berlinchan.com",
    archivedBlogUrl: "https://archived-blog.berlinchan.com",
    title: siteConfig.title,
    subtitle: "",
    UTC: "+08",
    postsPerPage: 10,
    disqusShortname: "berlinchan",
    menu: [
      {
        label: "自由的家猫",
        link: "https://www.awildpetcat.com/",
      },
      {
        label: "旧站博物馆",
        link: "https://museum.berlinchan.com/",
      },
      {
        label: "关于",
        path: "/pages/about",
      },
    ],
    author: siteConfig.author,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'archivedBlog',
        path: `./content/archived-blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./content",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images",
      },
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
              }
            }
          }
        `,
        feeds: [
          {
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
                ) {
                    nodes {
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
            `,
            output: siteConfig.author.contacts.rss,
            title: `${siteConfig.title} RSS Feed`,
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map((node) => ({
                ...node.frontmatter,
                description: node.frontmatter.description || node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }],
              })),
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
    "gatsby-plugin-optimize-svgs",
  ],
};
