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
    </div>
  )
}

export default TeacherContent
