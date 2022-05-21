import React from 'react'
import {Avatar,Typography} from "@mui/material";
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'

const MyModules = () => {
    const [modulesList,setModulesList] = useState([])

    async function getModulesList() {
        try {
            const response = await axios.get('module/all')
            setModulesList(response.data.message)
        } catch (error) {
            
        }
    }

    useEffect(() =>{getModulesList()},[])
  return (
    <div style= {{borderRadius: '10px',backgroundColor: 'white',height: '220px',border:'1px solid #E5E5E5'}}>
        <div style= {{margin:'10px'}}>
            <Typography variant="h6" style={{flex: 1}}>
                Modules
            </Typography>
        </div>
        <div style={{display: 'flex'}}>
            {[].map(module => {
                return (
                    <div key={module.id} 
                        style={{width:'150px',height:'150px',margin:'10px',border:'1px solid #E5E5E5',display: 'flex',flexDirection: 'column',alignItems: 'center',padding: '10px'
                        }}
                        onClick={()=> console.log(module.name)}
                    >
                        <Avatar >M</Avatar>
                        <Typography variant="subtitle2">
                            {module.shortName}
                        </Typography>
                        <Typography variant="body2" style={{textAlign: 'center'}}>
                            {module.name}
                        </Typography>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyModules