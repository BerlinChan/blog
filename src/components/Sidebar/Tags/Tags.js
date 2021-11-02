import React from 'react'
import { styled } from '@mui/material/styles';
import { Link as GatsbyLink } from 'gatsby'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useTagsList } from '../../../hooks'
import kebabCase from 'lodash/kebabCase'
import Box from '@mui/material/Box'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'

const PREFIX = 'Tags';

const classes = {
  title: `${PREFIX}-title`,
  listBox: `${PREFIX}-listBox`,
  tagLink: `${PREFIX}-tagLink`,
  activeLink: `${PREFIX}-activeLink`
};

const StyledBox = styled(Box)((
  {
    theme
  }
) => ({
  [`& .${classes.title}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(.5, 1),
    backgroundColor: theme.palette.background.paper,
  },

  [`& .${classes.listBox}`]: {
    padding: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
  },

  [`& .${classes.tagLink}`]: {
    margin: theme.spacing(0, 3, .5, 0),
  },

  [`& .${classes.activeLink}`]: {
    color: theme.palette.action.active,
  }
}));

const Tags = (props) => {

  const tagsList = useTagsList()
    .map(tag => ({ ...tag, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, 20)

  return (
    <StyledBox {...props}>
      <Box className={classes.title}>
        <Typography variant="subtitle1">标签</Typography>
        <IconButton component={GatsbyLink} to={'/tags'} aria-label="more" size="small" title={'全部'}>
          <MoreHorizIcon/>
        </IconButton>
      </Box>
      <Box className={classes.listBox}>
        {tagsList.map((tag, index) =>
          <Link component={GatsbyLink} to={`/tag/${kebabCase(tag.fieldValue)}/`}
                variant="body1" noWrap key={index}
                className={classes.tagLink} activeClassName={classes.activeLink}>
            {tag.fieldValue}
          </Link>)}
      </Box>
    </StyledBox>
  );
}

export default Tags
