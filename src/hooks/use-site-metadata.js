import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            url
            archivedBlogUrl
            title
            subtitle
            postsPerPage
            copyright
            UTC
            disqusShortname
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
          }
        }
      }
    `,
  )

  return site.siteMetadata
}

export default useSiteMetadata
