import React from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../../hooks'

const Metadata = (props) => {
  const { title: siteTitle, author: { name: siteAuthorName } } = useSiteMetadata()
  const {
    title, url, description, type, image,
  } = props
  const { url: imageUrl, width: imageWidth, height: imageHeight } = image

  return (
    <Helmet>
      {description && <meta name="description" content={description}/>}
      <meta name="author" content={siteAuthorName}/>

      {/* Open Graph for Facebook & Twitter */}
      {url && <meta property="og:url" content={url}/>}
      <meta property="og:site_name" content={siteTitle}/>
      {type && <meta property="og:type" content={type}/>}
      <meta property="article:author" content={siteAuthorName}/>
      {title && <meta property="og:title" content={title}/>}
      {description && <meta property="og:description" content={description}/>}
      {image && <meta property="og:image" content={imageUrl}/>}
      {image && <meta property="og:image:secure_url" content={imageUrl}/>}
      {image && <meta property="og:image:width" content={imageWidth}/>}
      {image && <meta property="og:image:height" content={imageHeight}/>}

      {/*twitter card*/}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:site" content="@BerlinChanCom"/>
      <meta name="twitter:creator" content="@BerlinChanCom"/>
    </Helmet>
  )
}

export default Metadata
