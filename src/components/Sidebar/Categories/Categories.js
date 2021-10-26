import React from 'react'
import { styled } from '@mui/material/styles';
import { Link as GatsbyLink } from 'gatsby'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useCategoriesList } from '../../../hooks'
import kebabCase from 'lodash/kebabCase'
import Box from '@mui/material/Box'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'

const PREFIX = 'Categories';

const classes = {
  title: `${PREFIX}-title`,
  link: `${PREFIX}-link`,
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

  [`& .${classes.link}`]: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },

  [`& .${classes.activeLink}`]: {
    color: theme.palette.action.active,
  }
}));

const Categories = (props) => {

  const categories = useCategoriesList()

  return (
    <StyledBox {...props}>
      <Box className={classes.title}>
        <Typography variant="subtitle1">分类</Typography>
        <IconButton component={GatsbyLink} to={'/categories'} aria-label="more" size="small" title={'全部'}>
          <MoreHorizIcon/>
        </IconButton>
      </Box>
      {categories.map((category, index) =>
        <Link component={GatsbyLink} to={`/category/${kebabCase(category.fieldValue)}/`}
              display="block" variant="body1" noWrap key={index}
              className={classes.link} activeClassName={classes.activeLink}>
          {`${category.fieldValue} (${category.totalCount})`}
        </Link>)}
    </StyledBox>
  );
}

export default Categories
