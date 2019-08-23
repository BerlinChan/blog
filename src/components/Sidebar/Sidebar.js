import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import Categories from './Categories'
import Tags from './Tags'

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
}))

export default () => {
  const classes = useStyles()

  return (<Grid container spacing={4}>
    <Grid item sm={6} md={12}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography>
          Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit
          amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
        </Typography>
      </Paper>
    </Grid>
    <Grid item sm={6} md={12}>
      <Categories/>
    </Grid>
    <Grid item sm={12} md={12}>
      <Tags/>
    </Grid>
  </Grid>)
}
