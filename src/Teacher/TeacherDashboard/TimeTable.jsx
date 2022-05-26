import React from 'react'
import DaySessions from './DaySessions'
import { useState,useEffect } from 'react'
import {Typography,Divider} from '@mui/material'
import axios from '../../API/Axios'

const TimeTable = () => {
   
    const [sundayList,setSundayList] = useState([])
    const [mondayList,setMondayList] = useState([])
    const [tuesdayList,setTuesdayList] = useState([])
    const [wednesdayList,setWednesdayList] = useState([])
    const [thursdayList,setThursdayList] = useState([])
  
    async function getLessons() {
      try {
        const response = await axios.get(`lessons/allOfSection=${1}/inSemester=1`)
        setSundayList(response.data.message.sunday)
        setMondayList(response.data.message.monday)
        setTuesdayList(response.data.message.tuesday)
        setWednesdayList(response.data.message.wednesday)
        setThursdayList(response.data.message.thursday)
      } catch (error) {
        
      }
    }

    useEffect(() =>{getLessons()},[])
  
    return (
      <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '510px',border:'1px solid #E5E5E5'}}>
        <div style={{padding:"10px"}}>
          <Typography variant="h6" style={{flex: 1}}>
            My schedule
          </Typography>
        </div>
        <div style= {{padding:"10px",paddingBottom:"10px",overflow: 'hidden',backgroundColor: 'white',height: '430px',display: 'flex',justifyContent: 'center'}}>
          <DaySessions dayName={'Sunday'} dayList={sundayList}/> 
          <DaySessions dayName={'Monday'} dayList={mondayList}/> 
          <DaySessions dayName={'Tuesday'} dayList={tuesdayList}/> 
          <DaySessions dayName={'Wednseday'} dayList={wednesdayList}/>  
          <DaySessions dayName={'Thursday'} dayList={thursdayList}/> 
        </div>
      </div>
    )
}

export default TimeTable