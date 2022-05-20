import React from 'react'
import { Grid } from'@mui/material'
import TeacherSideBar from './TeacherSideBar'
import TeacherDashboard from './TeacherDashboard/TeacherDashboard'
import ChapterControl from './ChapterControl/ChapterControl'
import MarksControl from './MarksControl/MarksControl'

const TeacherContent = () => {
  return (
    <div>
        <TeacherSideBar />
      {/* <Grid container spacing={1}>
            <Grid item xs={2}>
                <TeacherSideBar />
            </Grid>
            <Grid item xs={10}>
                <TeacherDashboard />
            </Grid>
      </Grid> */}
    </div>
  )
}

export default TeacherContent
