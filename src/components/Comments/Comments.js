import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import { useSiteMetadata } from '../../hooks'

const Comments = ({ postTitle, postSlug }) => {
  const { siteUrl, disqusShortname } = useSiteMetadata()

  if (!disqusShortname) {
    return null
  }

  return (
    <ReactDisqusComments
      shortname={disqusShortname}
      identifier={postSlug}
      title={postTitle}
      url={siteUrl + postSlug}
    />
  )
}

export default Comments
