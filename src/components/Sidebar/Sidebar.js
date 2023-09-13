import React from 'react'
import Grid from '@mui/material/Grid'
import Categories from './Categories'
import Tags from './Tags'

const Sidebar = () => {
  return (<Grid container spacing={4}>
    <Grid item xs={12} sm={6} md={12}>
      <Categories/>
    </Grid>
    <Grid item xs={12} sm={6} md={12}>
      <Tags/>
    </Grid>
  </Grid>)
}

export default Sidebar
