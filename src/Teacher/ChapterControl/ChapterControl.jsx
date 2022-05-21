import React from 'react'
import { Grid } from '@mui/material'
import MyModules from './MyModules'
import MyChapter from './MyChapter'
import Header from '../../Header'

const ChapterControl = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <MyModules />
      </Grid>
      <Grid item xs={12}>
        <MyChapter />
      </Grid>
    </Grid>
  )
}

export default ChapterControl
