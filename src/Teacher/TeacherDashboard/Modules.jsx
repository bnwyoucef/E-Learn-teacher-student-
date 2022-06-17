import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider} from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'


const Modules = () => {
    const [modulesList,setModulesList] = useState([])
    const [teacherId,setTeacherId] = useState(0);

    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setTeacherId(parseInt(loginStatus.currentUser.id));
      }
    },[]);
  
    function compare( a, b ) {
      if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
      }
      if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
      }
      return 0;
    }
  
    async function getMyModules() {
      try {
        if(teacherId) {
          const response = await axios.get(`teacher/modulesOfTeacher/${teacherId}`);
          setModulesList(response.data.message.sort(compare));
        }
      }catch(err) {
        console.log(err.message);
      }
    }
  
    useEffect(()=> {getMyModules()},[teacherId])
  
    return (
      <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh',border:'1px solid #E5E5E5'}}>
        <div style={{padding:"10px"}}>
          <Typography variant="h6" style={{flex: 1}}>
            Modules
          </Typography>
        </div>
        <Divider />
      <List
        dense
        disablePadding
        sx={{ width: "100%",marginTop:'10px',height: "85%",overflow: "auto",bgcolor: "background.paper",
        //change the background color of item when it clicked
          '& .MuiListItemButton-root:focus': {
            bgcolor: '#7da9ff',
              color: 'white',
          },
        }}
      >
        {modulesList.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              disablePadding  
            >
              <ListItemButton>
              <BookIcon color='primary'/>
                <ListItemText id={labelId} primary={value.name} style={{marginLeft:"10px",width:"70%"}} />
                <ListItemText id={labelId} primary={value.isTheLecturer === "0"?"":"Lecturer"} style={{marginLeft:"10px",color:'#3282B8'}} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      </div>
    );
}

export default Modules
