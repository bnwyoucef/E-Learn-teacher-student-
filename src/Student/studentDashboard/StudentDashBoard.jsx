import React from 'react'
import { Grid } from '@mui/material'
import NewsControl from './NewsControl'
import StudentTimeTable from './StudentTimeTable'

const StudentDashboard = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <NewsControl />
        </Grid>
        <Grid item xs={12}>
          <StudentTimeTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default StudentDashboard
