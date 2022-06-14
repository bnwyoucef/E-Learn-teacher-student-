import React from 'react'
import axios from '../../API/Axios'
import { useState,useEffect } from 'react';
import MarksTable from './Table';

const StudentMarksFill = () => {

    const [studentId,setStudentId] = useState(0);
    const [moduleList,setModulesList] = useState([])

    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setStudentId(parseInt(loginStatus.currentUser.id));
      }
    },[]);

    async function getAllModules() {
        if(studentId > 0){
            try {
                const response = await axios.get(`marks/ofStudent=${studentId}/InSemester=${1}`);
                console.log('hey:',response.data.message);
                setModulesList(response.data.message);
            } catch (error) {
                
            }   
        }
    }

    useEffect(() => {getAllModules()},[studentId]);

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'4px',height:'500px'}}
    >
        <MarksTable marksList={moduleList}/>
    </div>
  )
}

export default StudentMarksFill
