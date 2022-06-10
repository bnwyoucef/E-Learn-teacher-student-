import React from 'react'
import { Grid } from '@mui/material'
import Header from '../../Header'
import TeacherStudent from './TeacherStudent'
import StudentMarksFill from './StudentMarksFill'

const MarksControl = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={6}>
        <TeacherStudent />
      </Grid>
      <Grid item xs={6}>
        <StudentMarksFill />
      </Grid>
    </Grid>
  )
}

export default MarksControl
