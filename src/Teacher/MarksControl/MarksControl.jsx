import React from 'react'
import { Grid } from '@mui/material'
import Header from '../../Header'
import TeacherStudent from './TeacherStudent'
import StudentMarksFill from './StudentMarksFill'
import {useState} from 'react';

const MarksControl = () => {
  const [currentStudent,setCurrentStudent] = useState({});
 

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={6}>
        <TeacherStudent setCurrentStudent={setCurrentStudent}/>
      </Grid>
      <Grid item xs={6}>
        <StudentMarksFill currentStudent={currentStudent}/>
      </Grid>
    </Grid>
  )
}

export default MarksControl
