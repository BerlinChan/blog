import React from 'react'
import Box from '@mui/material/Box'
import InfoIcon from '@mui/icons-material/Info'
import Link from '@mui/material/Link'
import SnackbarContent from '@mui/material/SnackbarContent'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import {
  createTheme,
} from '@mui/material/styles';

const ArchivedBlogTips = ({ originLink }) => {
  const theme = createTheme()

  return (
    <SnackbarContent
      elevation={0} sx={{
        display: 'block',
        backgroundColor: blue[500],
      }}
      message={
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <InfoIcon sx={{
            fontSize: 20,
            opacity: 0.9,
            marginRight: theme.spacing(1),
          }} />
          <Typography variant={'body2'} noWrap
            sx={{maxWidth: '90%'}}>
            {'这是旧博客文章存档，原页面: '}
            <Link href={originLink} target={'_blank'} rel="noopener"
                  color={'inherit'}>{originLink}</Link>
          </Typography>
        </Box>}
    />
  );
}

export default ArchivedBlogTips
