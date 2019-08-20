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
                rss
              }
            }
            menu {
              label
              path
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
