import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: 18,
    lineHeight: 1.6,
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '& blockquote': {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.grey[200],
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
  },
}))

const Content = ({ html }) => {
  const classes = useStyles()

  return (
    <div className={classes.content} dangerouslySetInnerHTML={{ __html: html }}/>
  )
}

export default Content
