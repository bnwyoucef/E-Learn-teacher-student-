import React from 'react'
import {Typography,Avatar,Divider} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SelectLevel from './SelectLevel'
import SelectGroup from './SelectGroup'
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'

const TeacherStudent = () => {

    const [studentsList,setStudentsList] = useState([])

    async function getAllStudents() {
        try {
            const response = await axios.get('student/all')
            setStudentsList(response.data.message)
        } catch (error) {
            
        }
    }

    useEffect(() =>{getAllStudents()},[])
  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'4px',height:'500px'}}
    >
        <div style={{height:'60px',display:'flex',alignItems: 'center',marginLeft:'10px'}}>
            <Typography variant="h6">
                Fill Marks
            </Typography>
            <SelectLevel />
            <SelectGroup />
        </div> 
        <Divider /> 
    <List
        dense
        disablePadding
        sx={{ width: "100%",height: "87%",overflow: "auto",bgcolor: "background.paper",
        //change the background color of item when it clicked
          '& .MuiListItemButton-root:focus': {
            bgcolor: '#7da9ff',
              color: 'white',
          },
        }}
      >
        {studentsList.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>{value.name.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.name + ' ' + value.lastName}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> 
    </div>
  )
}

export default TeacherStudent