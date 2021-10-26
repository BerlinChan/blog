import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import InfoIcon from '@mui/icons-material/Info'
import Link from '@mui/material/Link'
import SnackbarContent from '@mui/material/SnackbarContent'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'

const PREFIX = 'ArchivedBlogTips';

const classes = {
  info: `${PREFIX}-info`,
  message: `${PREFIX}-message`,
  icon: `${PREFIX}-icon`,
  text: `${PREFIX}-text`
};

const StyledBox = styled(Box)((
  {
    theme
  }
) => ({
  [`& .${classes.info}`]: {
    display: 'block',
    backgroundColor: blue[500],
  },

  [`&.${classes.message}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.icon}`]: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },

  [`& .${classes.text}`]: {
    maxWidth: '90%',
  }
}));

const ArchivedBlogTips = ({ originLink }) => {


  return (
    <SnackbarContent
      elevation={0} className={classes.info}
      message={
        <StyledBox className={classes.message}>
          <InfoIcon className={classes.icon}/>
          <Typography variant={'body2'} noWrap className={classes.text}>
            {'这是旧博客文章存档，原页面: '}
            <Link href={originLink} target={'_blank'} rel="noopener"
                  color={'inherit'}>{originLink}</Link>
          </Typography>
        </StyledBox>}
    />
  );
}

export default ArchivedBlogTips
