import React from 'react'
import { Grid } from '@mui/material'
import MyModules from './MyModules'
import MyChapter from './MyChapter'
import Header from '../../Header'
import {useState,useEffect} from 'react';

const ChapterControl = () => {

  const [theSelectedModule,setTheSelectedModule] = useState({});
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <MyModules setTheSelectedModule={setTheSelectedModule}/>
      </Grid>
      <Grid item xs={12}>
        <MyChapter theSelectedModule={theSelectedModule}/>
      </Grid>
    </Grid>
  )
}

export default ChapterControl
