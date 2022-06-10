import React from 'react'
import DaySessions from './DaySessions'
import { useState,useEffect } from 'react'
import {Typography,Divider} from '@mui/material'
import axios from '../../API/Axios'

const StudentTimeTable = () => {
   
    const [sundayList,setSundayList] = useState([])
    const [mondayList,setMondayList] = useState([])
    const [tuesdayList,setTuesdayList] = useState([])
    const [wednesdayList,setWednesdayList] = useState([])
    const [thursdayList,setThursdayList] = useState([])
    const [groupId,setGroupId] = useState(0);

    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setGroupId(parseInt(loginStatus.currentUser.group_Id));
      }
    },[])
  
    async function getLessons() {  
      try {
        if(groupId) {
          const response = await axios.get(`lessons/ofGroup/${groupId}`);
          console.log(response.data.message);
          setSundayList(response.data.message.sunday)
          setMondayList(response.data.message.monday)
          setTuesdayList(response.data.message.tuesday)
          setWednesdayList(response.data.message.wednesday)
          setThursdayList(response.data.message.thursday)
        }
      } catch (error) {
        
      }
    }

    useEffect(() =>{getLessons()},[groupId])
  
    return (
      <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '510px',border:'1px solid #E5E5E5'}}>
        <div style={{padding:"10px"}}>
          <Typography variant="h6" style={{flex: 1}}>
            My schedule
          </Typography>
        </div>
        <div style= {{paddingBottom:"10px",overflow: 'hidden',backgroundColor: 'white',height: '430px',display: 'flex',justifyContent: 'center'}}>
          <DaySessions dayName={'Sunday'} dayList={sundayList}/> 
          <DaySessions dayName={'Monday'} dayList={mondayList}/> 
          <DaySessions dayName={'Tuesday'} dayList={tuesdayList}/> 
          <DaySessions dayName={'Wednseday'} dayList={wednesdayList}/>  
          <DaySessions dayName={'Thursday'} dayList={thursdayList}/> 
        </div>
      </div>
    )
}

export default StudentTimeTable