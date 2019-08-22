import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
              bio
              photo
              contacts {
                email
                twitter
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
            url
            archivedBlogUrl
            title
            subtitle
            copyright
            disqusShortname
          }
        }
      }
    `,
  )

  return site.siteMetadata
}

export default useSiteMetadata
