import React from 'react'
import { styled } from '@mui/material/styles';

const PREFIX = 'Content';

const classes = {
  content: `${PREFIX}-content`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.content}`]: {
    fontSize: '1.125rem',
    lineHeight: 1.6,
    '& p': {
      textIndent: '2em',
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '& blockquote': {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.background.paper,
    },
    '& table': {
      display: 'block',
      width: '100%',
      overflow: 'auto',
      borderSpacing: 0,
      margin: theme.spacing(2, 0),
      borderCollapse: 'collapse',
      '& tr': {
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        '& th': {
          fontWeight: theme.typography.fontWeightBold,
        },
        '& th,& td': {
          border: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing(1, 2),
        },
        '&:nth-child(even)': {
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
  }
}));

const Content = ({ html }) => {


  return <Root className={classes.content} dangerouslySetInnerHTML={{ __html: html }}/>;
}

export default Content
