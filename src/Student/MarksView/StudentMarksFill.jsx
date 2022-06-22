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
                setModulesList(response.data.message);
            } catch (error) {
                
            }   
        }
    }

    useEffect(() => {getAllModules()},[studentId]);

  return (
        <MarksTable marksList={moduleList}/>
  )
}

export default StudentMarksFill
