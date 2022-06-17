import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {Avatar,Typography,Divider} from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'

const Groups = () => {
    const [groupsList,setGroupsList] = useState([])
    const [teacherId,setTeacherId] = useState(0);

    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setTeacherId(parseInt(loginStatus.currentUser.id));
      }
    },[])
  
    function compare( a, b ) {
      if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
      }
      if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
      }
      return 0;
    }
  
    async function getMyGroups() {
      try {
        if(teacherId) {
          const response = await axios.get(`teacher/${teacherId}/groups`)
          setGroupsList(response.data.message.sort(compare))  
        }
      }catch(err) {
        console.log(err.message);
      }
    }
  
    useEffect(()=> {getMyGroups()},[teacherId])
  
    return (
      <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh',border:'1px solid #E5E5E5'}}>
        <div style={{padding:"10px"}}>
          <Typography variant="h6" style={{flex: 1}}>
            Groups
          </Typography>
        </div>
        <Divider />
      <List
        dense
        disablePadding
        sx={{ width: "100%",height: "85%",overflow: "auto",marginTop:'10px',bgcolor: "background.paper",
        //change the background color of item when it clicked
          '& .MuiListItemButton-root:focus': {
            bgcolor: '#7da9ff',
              color: 'white',
          },
        }}
      >
        {groupsList.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <GroupsIcon color='primary'/>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value.name} />
                <ListItemText id={labelId} primary={value.inSection} style={{color:'#3282B8'}}/>
                <ListItemText id={labelId} primary={value.inLevel} style={{color:'#3282B8'}}/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      </div>
    );
}

export default Groups
