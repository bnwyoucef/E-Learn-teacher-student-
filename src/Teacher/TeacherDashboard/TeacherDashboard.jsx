import React from 'react'
import { Grid } from '@mui/material'
import NewsControl from './NewsControl'
import TimeTable from './TimeTable'
import Modules from './Modules'
import Groups from './Groups'
import Header from '../Header'
import Calendar from './Calendar'

const TeacherDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
         <Header/>
        </Grid>
        <Grid item xs={12}>
            <NewsControl />
        </Grid>
        <Grid item xs={8}>
          <TimeTable />
        </Grid>
        <Grid item xs={4}>
          <Grid item sm={12}>
           <Calendar />
          </Grid>        
        </Grid>
        <Grid item xs={6}>
          <Modules />
        </Grid>
        <Grid item xs={6}>
          <Groups />
        </Grid>
      </Grid>
    </div>
  )
}

export default TeacherDashboard
