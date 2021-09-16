import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteUrl
            archivedBlogUrl
            title
            subtitle
            postsPerPage
            UTC
            disqusShortname
            author {
              name
              bio
              contacts {
                email
                twitter
                linkedIn
                github
                facebook
                youtube
                rss
              }
            }
            menu {
              label
              path
              link
            }
          }
        }
      }
    `,
  )

  return site.siteMetadata
}

export default useSiteMetadata
