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
    const [groupId,setGroupId] = useState(0);

    useEffect(() => {
        if(localStorage.getItem('loginStatus')){
          const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
          setGroupId(parseInt(loginStatus.currentUser.batch.level.id));
        }
      },[])

      async function getMyModules() {
        try {
          if(groupId) {
            const response = await axios.get(`module/OfLevel/${groupId}`); 
            setModulesList(response.data.message);
          }
        }catch(err) {
          console.log(err.message);
        }
      }
    
      useEffect(()=> {getMyModules()},[groupId]);

  return (
    <div style= {{borderRadius: '10px',backgroundColor: 'white',height: '300px',border:'1px solid #E5E5E5',position: 'relative'}}>
        <div style= {{margin:'10px'}}>
            <Typography variant="h6" style={{flex: 1}}>
                Modules
            </Typography>
        </div>
        <div style={{display: 'flex',overflowX:'hidden',position:'absolute',width:'100%'}}>
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
                      height="140px"
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