import React from 'react'
import {Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import imagesLink from '../../Constants/constants';
import './markStyle.css';
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'

const MyModules = ({ setTheSelectedModule }) => {
    const [modulesList,setModulesList] = useState([])
    const [teacherId,setTeacherId] = useState(0);

    useEffect(() => {
        if(localStorage.getItem('loginStatus')){
          const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
          setTeacherId(parseInt(loginStatus.currentUser.id));
        }
      },[])

      async function getMyModules() {
        try {
          if(teacherId) {
            const response = await axios.get(`teacher/modulesOfTeacher/${teacherId}`)
            setModulesList(response.data.message)
            console.log('hey:',response.data.message);
          }
        }catch(err) {
          console.log(err.message);
        }
      }
    
      useEffect(()=> {getMyModules()},[teacherId])
  return (
    <div style= {{borderRadius: '10px',backgroundColor: 'white',height: '300px',border:'1px solid #E5E5E5'}}>
        <div style= {{margin:'10px'}}>
            <Typography variant="h6" style={{flex: 1}}>
                Modules
            </Typography>
        </div>
        <div style={{display: 'flex'}}>
            {modulesList.map((module,index) => {
                return (
                    <Card 
                        className={'moduleCard'}
                        key={module.id} 
                        style={{width:'190px',height:'190px',margin:'10px',border:'1px solid #E5E5E5',display: 'flex',flexDirection: 'column',alignItems: 'center',padding: '10px',cursor: 'pointer'}}
                        onClick={()=> setTheSelectedModule(module)}
                    >
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={`https://school-systemmanagement-production.up.railway.app/module/images/${module.imageUrl}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="subtitle2" component="div">
                        {module.name}
                      </Typography>
                    </CardContent>
                  </Card>
                )
            })}
        </div>
    </div>
  )
}

export default MyModules