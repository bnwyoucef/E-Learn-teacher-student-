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
    const [teacherId,setTeacherId] = useState(0);

    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setTeacherId(parseInt(loginStatus.currentUser.id));
      }
    },[])
  
    async function getLessons() {
      
      try {
        if(teacherId) {
          const response = await axios.get(`lessons/ofTeacher/${teacherId}`)
          setSundayList(response.data.message.sunday)
          setMondayList(response.data.message.monday)
          setTuesdayList(response.data.message.tuesday)
          setWednesdayList(response.data.message.wednesday)
          setThursdayList(response.data.message.thursday)
        }
      } catch (error) {
        
      }
    }

    useEffect(() =>{getLessons()},[teacherId])
  
    return (
      <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '510px',border:'1px solid #E5E5E5'}}>
        <div style={{height:'60px',display: 'flex',alignItems: 'center',marginLeft:'10px'}}>
          <Typography variant="h5" style={{color:'#3282B8'}}>
            My Schedule
          </Typography>
        </div>
        <div style= {{overflow: 'hidden',backgroundColor: 'white',height: '460px',display: 'flex',justifyContent: 'center'}}>
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