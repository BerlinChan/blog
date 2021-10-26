import React from 'react'
import Box from '@mui/material/Box'
import InfoIcon from '@mui/icons-material/Info'
import Link from '@mui/material/Link'
import SnackbarContent from '@mui/material/SnackbarContent'
import Typography from '@mui/material/Typography'
import makeStyles from '@mui/styles/makeStyles';
import { blue } from '@mui/material/colors'

const useStyles = makeStyles(theme => ({
  info: {
    display: 'block',
    backgroundColor: blue[500],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  text: {
    maxWidth: '90%',
  },
}))
const ArchivedBlogTips = ({ originLink }) => {
  const classes = useStyles()

  return (<SnackbarContent
    elevation={0} className={classes.info}
    message={
      <Box className={classes.message}>
        <InfoIcon className={classes.icon}/>
        <Typography variant={'body2'} noWrap className={classes.text}>
          {'这是旧博客文章存档，原页面: '}
          <Link href={originLink} target={'_blank'} rel="noopener"
                color={'inherit'}>{originLink}</Link>
        </Typography>
      </Box>}
  />)
}

export default ArchivedBlogTips
