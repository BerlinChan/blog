import React, { useRef, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Page = ({ title, children }) => {
  const pageRef = useRef()

  useEffect(() => {
    pageRef.current.scrollIntoView()
  })

  return (<Box ref={pageRef}>
    {title && <Typography component={'h2'} variant={'h4'} gutterBottom>
      {title}
    </Typography>}
    {children}
  </Box>)
}

export default Page
